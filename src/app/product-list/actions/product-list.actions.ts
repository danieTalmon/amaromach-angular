import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import { Cart } from './../../shared/models/cart.model';

export enum productListActions {
  LOAD_PRODUCTS = '[Product] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Product] Products Loaded Success',
  LOAD_PRODUCTS_FALIURE = '[Product] Products Loaded Faliure',
  GET_PRODUCT = '[Product] Get Product',
  GET_PRODUCT_SUCCESS = '[Product] Get Product Success',
  GET_PRODUCT_FALIURE = '[Product] Get Product Faliure',
  REDUCE_LIMITS = '[Product] Reduce Limits',
}

export const loadProducts = createAction(productListActions.LOAD_PRODUCTS);

export const loadProductsSuccess = createAction(
  productListActions.LOAD_PRODUCTS_SUCCESS,
  props<{ productList: Product[] }>()
);

export const loadProductsFaliure = createAction(
  productListActions.LOAD_PRODUCTS_FALIURE,
  props<{ errorMsg: string }>()
);

export const getProduct = createAction(
  productListActions.GET_PRODUCT,
  props<{ productName: string }>()
);

export const getProductSuccess = createAction(
  productListActions.GET_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const getProductFaliure = createAction(
  productListActions.GET_PRODUCT_FALIURE,
  props<{ errorMsg: string }>()
);

export const reduceLimits = createAction(
  productListActions.REDUCE_LIMITS,
  props<{ cart: Cart }>()
);
