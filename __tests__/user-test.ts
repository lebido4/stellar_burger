import {
	fetchUser,
	updateUser,
	register,
	login,
	logout,
	initialState,
	reducer,
} from '../src/services/slices/user';

const mockUser = {
	email: 'example@example.com',
	name: 'Example',
};

const registrationPayload = {
	email: 'example@example.com',
	name: 'Example',
	password: 'Example',
};

const loginPayload = {
	email: 'example@example.com',
	password: 'Example',
};

describe('userReducer', () => {
	describe('Регистрация', () => {
		it('Ожидание', () => {
			const newState = reducer(
				initialState,
				register.pending('pending', registrationPayload)
			);
			expect(newState.registerError).toBeUndefined();
		});

		it('Успешный запрос', () => {
			const newState = reducer(
				initialState,
				register.fulfilled(mockUser, 'fulfilled', registrationPayload)
			);
			expect(newState.isAuthenticated).toBe(true);
			expect(newState.data).toEqual(mockUser);
			expect(newState.registerError).toBeUndefined();
		});

		it('Неверный запрос', () => {
			const errorMsg = 'register.rejected';
			const newState = reducer(
				initialState,
				register.rejected(new Error(errorMsg), 'rejected', registrationPayload)
			);
			expect(newState.registerError?.message).toBe(errorMsg);
		});
	});

	describe('Логин', () => {
		it('Ожидание', () => {
			const state = reducer(
				initialState,
				login.pending('pending', loginPayload)
			);
			expect(state.loginError).toBeUndefined();
		});

		it('Успешный запрос', () => {
			const state = reducer(
				initialState,
				login.fulfilled(mockUser, 'fulfilled', loginPayload)
			);
			expect(state.isAuthenticated).toBe(true);
			expect(state.data).toEqual(mockUser);
			expect(state.loginError).toBeUndefined();
		});

		it('Неверный запрос', () => {
			const errorText = 'login.rejected';
			const state = reducer(
				initialState,
				login.rejected(new Error(errorText), 'rejected', loginPayload)
			);
			expect(state.loginError?.message).toBe(errorText);
		});
	});

	describe('updateUser', () => {
		it('Успешный запрос', () => {
			const state = reducer(
				initialState,
				updateUser.fulfilled(mockUser, 'fulfilled', mockUser)
			);
			expect(state.data).toEqual(mockUser);
		});
	});

	describe('Выход', () => {
		it('Ожидание', () => {
			const state = reducer(
				initialState,
				logout.fulfilled(undefined, 'fulfilled')
			);
			expect(state.isAuthenticated).toBe(false);
			expect(state.data).toEqual({ email: '', name: '' });
		});
	});

	describe('fetchUser', () => {
		it('Успешный запрос', () => {
			const state = reducer(
				initialState,
				fetchUser.fulfilled(mockUser, 'fulfilled')
			);
			expect(state.isAuthenticated).toBe(true);
			expect(state.isAuthChecked).toBe(true);
			expect(state.data).toEqual(mockUser);
		});

		it('Неверный запрос', () => {
			const state = reducer(
				initialState,
				fetchUser.rejected(new Error('fetchUser.rejected'), 'rejected')
			);
			expect(state.isAuthenticated).toBe(false);
			expect(state.isAuthChecked).toBe(true);
		});
	});
});
