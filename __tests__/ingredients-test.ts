import {
  fetchIngredients,
  initialState,
  reducer
} from '../src/services/slices/ingredients';

const ingredientsMock = [
    {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0
    }
];

describe('ingredientsReducer', () => {
  describe('fetchIngredients', () => {
    it('pending', () => {
      const nextState = reducer(initialState, fetchIngredients.pending('requestId'));
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('Successful Request', () => {
      const nextState = reducer(initialState, fetchIngredients.fulfilled(ingredientsMock, 'requestId'));
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBeNull();
      expect(nextState.data).toEqual(ingredientsMock);
    });

    it('Bad Request', () => {
      const errText = 'Loading Ingredients Error';
      const error = new Error(errText);
      const nextState = reducer(initialState, fetchIngredients.rejected(error, 'requestId'));
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error?.message).toBe(errText);
    });
  });
});