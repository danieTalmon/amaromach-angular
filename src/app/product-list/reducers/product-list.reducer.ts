import { ProductListState } from './../../shared/models/product.model';
import { AppState } from './../../shared/models/store.model';
import { Product } from 'src/app/shared/models/product.model';
import {
  createReducer,
  on,
  ActionReducer,
  ActionCreator,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as ProductListActions from '../actions/product-list.actions';

export const initialState: Product[] = [];

const productListReducer: ActionReducer<
  Product[],
  ActionCreator
> = createReducer(
  initialState,
  on(
    ProductListActions.loadProductsSuccess,
    (productListState, { productList }) => [...productList]
  ),
  on(
    ProductListActions.loadProductsFaliure,
    (productListState) => productListState
  ),
  on(ProductListActions.reduceLimits, (productListState, { cart }) => {
    productListState
      .filter((product) => !!cart[product.name])
      .map((product) => {
        if (!!cart[product.name]) {
          return product.limit
            ? { ...product, limit: product.limit - cart[product.name] }
            : { ...product };
        } else {
          return { ...product };
        }
      });
    return [...productListState];
  })
);

export const selectFeatureProductList = createFeatureSelector<AppState>(
  'productList'
);

export const selectProductList = createSelector(
  selectFeatureProductList,
  (state: ProductListState) => state
);

export function ProductListReducer(
  state: Product[] | undefined,
  action: ActionCreator
) {
  return productListReducer(state, action);
}
