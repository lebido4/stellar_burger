import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '@store';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredient, setBun } from '../../services/slices/constructor';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
		const dispatch = useDispatch();
		const handleAdd = () => {
			if (ingredient.type === 'bun') {
				dispatch(setBun(ingredient));
			} else {
				dispatch(addIngredient(ingredient));
			}
		};

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
