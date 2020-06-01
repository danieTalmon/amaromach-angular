import { AppState } from './../../shared/models/store.model';
import { Cart, CartState } from './../../shared/models/cart.model';
import {
  createReducer,
  on,
  ActionReducer,
  ActionCreator,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export const initialState: Cart = {};

const cartReducer: ActionReducer<Cart, ActionCreator> = createReducer(
  initialState,
  on(CartActions.add, (cartState, { productName }) => ({
    ...cartState,
    [productName]: 1,
  })),
  on(CartActions.remove, (cartState, { productName }) => {
    const { [productName]: deleted, ...newCartState } = cartState;
    return newCartState;
  }),
  on(CartActions.changeAmount, (cartState, { product, newAmount }) => {
    if (!product.limit || newAmount <= product.limit) {
      return { ...cartState, [product.name]: newAmount };
    }
  }),
  on(CartActions.checkout, (cartState) => ({}))
);

export const selectFeatureCart = createFeatureSelector('cart');

export const selectCart = createSelector(
  selectFeatureCart,
  (state: CartState) => state
);

export function CartReducer(state: Cart | undefined, action: ActionCreator) {
  return cartReducer(state, action);
}
