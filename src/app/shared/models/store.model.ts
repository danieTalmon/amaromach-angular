import { CartState } from './cart.model';
import { ProductListState } from './product.model';

export interface AppState {
  cart: CartState;
  productList: ProductListState;
}
