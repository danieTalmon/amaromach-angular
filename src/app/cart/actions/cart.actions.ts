import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';

enum cartAction {
  ADD = '[CART] Add',
  REMOVE = '[Cart] Remove',
  CHANGE_AMOUNT = '[Cart] Change Amount',
  CHECKOUT = '[Cart] Checkout',
}

export const add = createAction(
  cartAction.ADD,
  props<{ productName: string }>()
);

export const remove = createAction(
  cartAction.REMOVE,
  props<{ productName: string }>()
);

export const changeAmount = createAction(
  cartAction.CHANGE_AMOUNT,
  props<{ product: Product; newAmount: number }>()
);

export const checkout = createAction(cartAction.CHECKOUT);
