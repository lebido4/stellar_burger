import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientsReducer } from '../slices/ingredients';
import { reducer as ordersReducer } from '../slices/orders';
import { reducer as builderReducer } from '../slices/constructor';
import { reducer as feedsReducer } from '../slices/feeds';
import { reducer as userReducer } from '../slices/user';
import { middleware as ordersMiddleware} from '../middlewares/orders';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
	ingredientsReducer,
  ordersReducer,
	builderReducer,
  feedsReducer,
  userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
