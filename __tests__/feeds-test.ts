import {
	fetchFeeds,
	initialState,
	reducer,
} from '../src/services/slices/feeds';

const feedsMockData = {
	orders: [],
	total: 1,
	totalToday: 1,
};

describe('feedsReducer', () => {
	describe('fetch', () => {
		test('pending', () => {
			const result = reducer(initialState, fetchFeeds.pending('pending'));
			expect(result.isLoading).toBe(true);
			expect(result.error).toBeNull();
		});

		test('Успешный запрос', () => {
			const result = reducer(
				initialState,
				fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
			);
			expect(result.isLoading).toBe(false);
			expect(result.error).toBeNull();
			expect(result.data).toEqual(feedsMockData);
		});

		test('Неверный запрос', () => {
			const errMsg = 'fetchFeeds.rejected';
			const errorInstance = new Error(errMsg);
			const result = reducer(
				initialState,
				fetchFeeds.rejected(errorInstance, 'rejected')
			);
			expect(result.isLoading).toBe(false);
			expect(result.error?.message).toBe(errMsg);
		});
	});
});
