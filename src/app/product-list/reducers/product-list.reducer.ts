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
import { CartState } from './../../cart/reducers/cart.reducer';

export interface ProductListState {
  productList: Product[];
  selectedProduct: Product | null;
}
export const productListToken = 'productList';

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
  on(
    ProductListActions.loadProductSuccess,
    (productListState, { product }) => ({
      ...productListState,
      selectedProduct: product,
    })
  ),
  on(ProductListActions.loadProductFaliure, (productListState) => ({
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
    return !!cart[product.name] && product.limit
      ? { ...product, limit: product.limit - cart[product.name] }
      : { ...product };
  });
};

export const getFeatureProductList = createFeatureSelector<ProductListState>(
  productListToken
);

export const getProductList = createSelector(
  getFeatureProductList,
  (state: ProductListState) => state.productList
);

export const getProduct = createSelector(
  getFeatureProductList,
  (state: ProductListState) => state.selectedProduct
);
