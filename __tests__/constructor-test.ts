import {
  initialState,
  setBun,
  reducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from '../src/services/slices/constructor';

const bunMockData = {
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
};

const ingredient1MockData = {
    id: "999",
    _id: "643d69a5c3f7b9001cfa0940",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0
};
const ingredient2MockData = {
    id: "1",
    _id: "643d69a5c3f7b9001cfa0947",
    name: "Плоды Фалленианского дерева",
    type: "main",
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
    __v: 0
};

describe('builderReducer', () => {
  describe('Bun', () => {
    it('Should set by setBun', () => {
      const newState = reducer(initialState, setBun(bunMockData));
      expect(newState.ingredients.length).toBe(0);
      expect(newState.bun).toStrictEqual(bunMockData);
    });

    it('should add by addIngredient if type is bun', () => {
      const stateAfter = reducer(initialState, addIngredient(bunMockData));
      const { id, ...bunFromState } = stateAfter.bun ?? {};
      expect(stateAfter.ingredients).toEqual([]);
      expect(bunFromState).toEqual(bunMockData);
    });
  });

  describe('Ingredients', () => {
    it('Adding Ingredient', () => {
      const result = reducer(initialState, addIngredient(ingredient1MockData));
      expect(result.ingredients.length).toBe(1);
      expect(result.bun).toBeNull();
      const { id, ...addedIngredient } = result.ingredients[0];
      const { id: _, ...original } = ingredient1MockData;
      expect(addedIngredient).toStrictEqual(original);
    });

    it('Removing Ingredient by id', () => {
      const filledState = {
        bun: null,
        ingredients: [ingredient1MockData, ingredient2MockData ]
      };
      const result = reducer(filledState, removeIngredient(ingredient1MockData.id));
      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toStrictEqual(ingredient2MockData);
      expect(result.bun).toBeNull();
    });

    describe('Moving Ingredients', () => {
      const ingredients = [ingredient1MockData, ingredient2MockData];

      it('Down', () => {
        const startingState = { bun: null, ingredients };
        const result = reducer(startingState, moveIngredient({ index: 0, upwards: false }));
        expect(result.ingredients).toEqual([ingredient2MockData, ingredient1MockData]);
        expect(result.bun).toBeNull();
      });

      it('Up', () => {
        const startingState = { bun: null, ingredients };
        const result = reducer(startingState, moveIngredient({ index: 1, upwards: true }));
        expect(result.ingredients).toEqual([ingredient2MockData, ingredient1MockData]);
        expect(result.bun).toBeNull();
      });
    });
  });

  it('Clearing State', () => {
    const populatedState = {
      bun: bunMockData,
      ingredients: [ingredient1MockData, ingredient2MockData]
    };
    const clearedState = reducer(populatedState, resetConstructor());
    expect(clearedState.ingredients).toEqual([]);
    expect(clearedState.bun).toBeNull();
  });
});