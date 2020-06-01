import { Cart } from './../../shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { createAction, props, Action } from '@ngrx/store';

enum productListAction {
  LOAD_PRODUCTS = '[Product] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Product] Products Loaded Success',
  LOAD_PRODUCTS_FALIURE = '[Product] Products Loaded Faliure',
  REDUCE_LIMITS = '[Product] Reduce Limits',
}

export const loadProducts = createAction(productListAction.LOAD_PRODUCTS);

export const loadProductsSuccess = createAction(
  productListAction.LOAD_PRODUCTS_SUCCESS,
  props<{productList: Product[]}>()
);

export const loadProductsFaliure = createAction(
  productListAction.LOAD_PRODUCTS_FALIURE
);

export const reduceLimits = createAction(
  productListAction.REDUCE_LIMITS,
  props<{ cart: Cart }>()
);
