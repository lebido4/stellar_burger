import store, { rootReducer } from '../src/services/store';

describe('root_Reducer', () => {
	test('Вызов reduser c UNKNOWN_ACTION', () => {
		const first = store.getState();
		const second = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
		expect(second).toEqual(first);
	});
});
