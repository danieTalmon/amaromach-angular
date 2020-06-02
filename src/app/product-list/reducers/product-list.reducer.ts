import { ProductListState } from './../../shared/models/product.model';
import { AppState } from './../../shared/models/store.model';
import { Product } from 'src/app/shared/models/product.model';
import {
  createReducer,
  on,
  ActionReducer,
  ActionCreator,
  Action,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as ProductListActions from '../actions/product-list.actions';

export const initialState: ProductListState = [];

const productListReducer: ActionReducer<
  ProductListState,
  Action
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
    return productListState.map((product) => {
      if (!!cart[product.name]) {
        return product.limit
          ? { ...product, limit: product.limit - cart[product.name] }
          : { ...product };
      } else {
        return { ...product };
      }
    });
  })
);

export const selectFeatureProductList = createFeatureSelector<ProductListState>(
  'productList'
);

export const selectProductList = createSelector(
  selectFeatureProductList,
  (state: ProductListState) => state
);

export const selectProduct = createSelector(
  selectFeatureProductList,
  (state: ProductListState, props) =>
    state.find((product) => product.name === props.id)
);

export function ProductListReducer(
  state: Product[] | undefined,
  action: Action
) {
  return productListReducer(state, action);
}
