import {
  fetchOrder,
  fetchOrders,
  createOrder,
  resetOrderModalData,
  initialState,
  reducer
} from '../src/services/slices/orders';

const mockOrder = {
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa0947'
  ],
  _id: '6622337897ede0001d0666b5',
  status: 'done',
  name: 'Example',
  createdAt: '2025-05-27T16:56:52.748Z',
  updatedAt: '2025-05-27T16:56:58.057Z',
  number: 79061
};

describe('ordersReducer', () => {
  describe('resetOrderModalData', () => {
    it('Clearing Modal Order', () => {
      const preloadedState = {
        isOrderLoading: true,
        isOrdersLoading: true,
        orderRequest: false,
        orderModalData: mockOrder,
        error: null,
        data: []
      };
      const updated = reducer(preloadedState, resetOrderModalData());
      expect(updated.orderModalData).toBeNull();
      expect(updated.data).toEqual([]);
      expect(updated.error).toBeNull();
      expect(updated.orderRequest).toBe(false);
      expect(updated.isOrdersLoading).toBe(true);
      expect(updated.isOrderLoading).toBe(true);
    });
  });

  describe('fetchOrders', () => {
    it('pending', () => {
      const updated = reducer(initialState, fetchOrders.pending('request-id'));
      expect(updated.isOrdersLoading).toBe(true);
      expect(updated.error).toBeNull();
    });

    it('fulfilled', () => {
      const updated = reducer(initialState, fetchOrders.fulfilled([mockOrder], 'request-id'));
      expect(updated.isOrdersLoading).toBe(false);
      expect(updated.error).toBeNull();
      expect(updated.data).toEqual([mockOrder]);
    });

    it('rejected', () => {
      const err = new Error('Failed to Get Orders');
      const updated = reducer(initialState, fetchOrders.rejected(err, 'request-id'));
      expect(updated.isOrdersLoading).toBe(false);
      expect(updated.error?.message).toBe(err.message);
    });
  });

  describe('fetchOrder', () => {
    it('pending', () => {
      const updated = reducer(initialState, fetchOrder.pending('req-id', mockOrder.number));
      expect(updated.isOrderLoading).toBe(true);
    });

    it('fulfilled', () => {
      const updated = reducer(
        initialState,
        fetchOrder.fulfilled(mockOrder, 'req-id', mockOrder.number)
      );
      expect(updated.isOrderLoading).toBe(false);
      expect(updated.orderModalData).toEqual(mockOrder);
    });

    it('rejected', () => {
      const err = new Error('Failed to Load Order');
      const updated = reducer(initialState, fetchOrder.rejected(err, 'req-id', mockOrder.number));
      expect(updated.isOrderLoading).toBe(false);
    });
  });

  describe('createOrder', () => {
    it('pending', () => {
      const updated = reducer(initialState, createOrder.pending('req-id', mockOrder.ingredients));
      expect(updated.orderRequest).toBe(true);
    });

    it('fulfilled', () => {
      const payload = { order: mockOrder, name: 'Example' };
      const updated = reducer(initialState, createOrder.fulfilled(payload, 'req-id', mockOrder.ingredients));
      expect(updated.orderRequest).toBe(false);
      expect(updated.orderModalData).toEqual(mockOrder);
    });

    it('rejected', () => {
      const err = new Error('Creating Order Error');
      const updated = reducer(initialState, createOrder.rejected(err, 'req-id', []));
      expect(updated.orderRequest).toBe(false);
    });
  });
});