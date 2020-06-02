import { ProductListState } from './../../shared/models/product.model';
import { CartState } from './../../shared/models/cart.model';
import { ProductListReducer } from './product-list.reducer';
import * as productListActions from '../actions/product-list.actions';
import { productsMock } from 'src/app/product-list/mock/product-list.mock';
describe('Reducer: cart', () => {
  const productName: string = productsMock[0].name;
  const errorMsg: string = 'unable to load the products';

  it('should success load products', () => {
    const newState: ProductListState = ProductListReducer(
      [],
      productListActions.loadProductsSuccess({ productList: productsMock })
    );
    expect(newState).toEqual(productsMock);
  });

  it('should failure load products', () => {
    const newState: ProductListState = ProductListReducer(
      [],
      productListActions.loadProductsFaliure({ errorMsg })
    );
    expect(newState).toEqual([]);
  });

  it('should reduce product limit', () => {
    const fakeCart: CartState = {
      [productsMock[1].name]: 5,
      [productsMock[3].name]: 10,
    };
    const newState: ProductListState = ProductListReducer(
      productsMock,
      productListActions.reduceLimits({ cart: fakeCart })
    );
    expect(newState[1].limit).toEqual(
      productsMock[1].limit - fakeCart[productsMock[1].name]
    );
    expect(newState[3].limit).toEqual(
      productsMock[3].limit - fakeCart[productsMock[3].name]
    );
  });
});
