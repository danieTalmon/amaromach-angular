import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { Cart, CartState } from './../../shared/models/cart.model';

export const initialState: Cart = {};

export const cartReducer: ActionReducer<Cart, Action> = createReducer(
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
    } else {
      return { ...cartState };
    }
  }),
  on(CartActions.checkout, (cartState) => ({}))
);

export const selectFeatureCart = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectFeatureCart,
  (state: CartState) => state
);

export const selectCartLength = createSelector(
  selectFeatureCart,
  (cart) => Object.keys(cart).length
);
