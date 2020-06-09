import { Cart } from './../../shared/models/cart.model';
import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';

enum cartAction {
  ADD_PRODUCT = '[Cart] Add Product',
  REMOVE_PRODUCT = '[Cart] Remove Product',
  CHANGE_AMOUNT = '[Cart] Change Amount',
  CHECKOUT = '[Cart] Checkout',
}

export const addProduct = createAction(
  cartAction.ADD_PRODUCT,
  props<{ productName: string }>()
);

export const removeProduct = createAction(
  cartAction.REMOVE_PRODUCT,
  props<{ productName: string }>()
);

export const changeAmount = createAction(
  cartAction.CHANGE_AMOUNT,
  props<{ product: Product; newAmount: number }>()
);

export const checkout = createAction(
  cartAction.CHECKOUT,
  props<{ cart: Cart }>()
);
