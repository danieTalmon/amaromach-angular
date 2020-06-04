import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { Cart } from './../../shared/models/cart.model';

export type CartState = Cart;
export const cartStsteToken = 'cart';

export const initialState: Cart = {};

export const cartReducer: ActionReducer<Cart, Action> = createReducer(
  initialState,
  on(CartActions.addProduct, (cartState, { productName }) => ({
    ...cartState,
    [productName]: 1,
  })),
  on(CartActions.removeProduct, (cartState, { productName }) => {
    const newCartState: CartState = { ...cartState };
    delete newCartState[productName];
    return newCartState;
  }),
  on(CartActions.changeAmount, (cartState, { product, newAmount }) => {
    if (!product.limit || newAmount <= product.limit) {
      return { ...cartState, [product.name]: newAmount };
    } else {
      return cartState;
    }
  }),
  on(CartActions.checkout, (cartState, { cart }) => ({}))
);

export const getFeatureCart = createFeatureSelector<CartState>(cartStsteToken);

export const getCart = createSelector(
  getFeatureCart,
  (state: CartState) => state
);

export const getCartLength = createSelector(
  getFeatureCart,
  (cart) => Object.keys(cart).length
);
