import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { createOrder, resetOrderModalData } from '../../services/slices/orders';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(store => store.userReducer);
	const constructorItems = useSelector(store => store.builderReducer);
	const orderRequest = useSelector(store => store.ordersReducer.orderRequest);
	const orderModalData = useSelector(store => store.ordersReducer.orderModalData);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
		if (!isAuthenticated) {
			return navigate('/login');
		}
		const data = [
			constructorItems.bun._id,
			...constructorItems.ingredients.map((ingredient) => ingredient.id),
			constructorItems.bun._id
		];
	  
		dispatch(createOrder(data));
  };
	const closeOrderModal = () => {
		dispatch(resetOrderModalData());
	};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
