import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { FC, useEffect } from 'react';
import { fetchOrders } from '../../services/slices/orders';
export const ProfileOrders: FC = () => {
	const dispatch = useDispatch();
	const { data: orders } = useSelector(store => store.ordersReducer);

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
