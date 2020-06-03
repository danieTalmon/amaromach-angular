import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import * as ProductListActions from '../actions/product-list.actions';
import { CartState } from './../../shared/models/cart.model';
import { ProductListState } from './../../shared/models/product.model';

export const initialState: ProductListState = {
  productList: [],
  selectedProduct: null,
};

export const productListReducer: ActionReducer<
  ProductListState,
  Action
> = createReducer(
  initialState,
  on(
    ProductListActions.loadProductsSuccess,
    (productListState, { productList }) => ({
      ...productListState,
      productList,
    })
  ),
  on(
    ProductListActions.loadProductsFaliure,
    (productListState) => productListState
  ),
  on(ProductListActions.getProductSuccess, (productListState, { product }) => ({
    ...productListState,
    selectedProduct: product,
  })),
  on(ProductListActions.getProductFaliure, (productListState) => ({
    ...productListState,
    selectedProduct: null,
  })),
  on(ProductListActions.reduceLimits, (productListState, { cart }) => ({
    ...productListState,
    productList: reduceLimits(productListState.productList, cart),
  }))
);

const reduceLimits = (productsList: Product[], cart: CartState) => {
  return productsList.map((product) => {
    if (!!cart[product.name]) {
      return product.limit
        ? { ...product, limit: product.limit - cart[product.name] }
        : { ...product };
    } else {
      return { ...product };
    }
  });
};

export const selectFeatureProductList = createFeatureSelector<ProductListState>(
  'productList'
);

export const selectProductList = createSelector(
  selectFeatureProductList,
  (state: ProductListState) => state.productList
);

export const selectProduct = createSelector(
  selectFeatureProductList,
  (state: ProductListState) => state.selectedProduct
);
