import { productsMock } from 'src/app/product-list/mock/product-list.mock';
import * as productListActions from '../actions/product-list.actions';
import { CartState } from './../../shared/models/cart.model';
import { Product, ProductListState } from './../../shared/models/product.model';
import { productListReducer } from './product-list.reducer';
describe('Reducer: cart', () => {
  const productName: string = productsMock[0].name;
  const initialState: ProductListState = {
    productList: [],
    selectedProduct: null,
  };
  const errorMsg: string = 'unable to load the products';

  it('should success load products', () => {
    const newState: ProductListState = productListReducer(
      initialState,
      productListActions.loadProductsSuccess({ productList: productsMock })
    );
    expect(newState).toEqual({ ...initialState, productList: productsMock });
  });

  it('should failure load products', () => {
    const newState: ProductListState = productListReducer(
      initialState,
      productListActions.loadProductsFaliure({ errorMsg })
    );
    expect(newState).toEqual({ ...initialState });
  });

  it('should success get product', () => {
    const product: Product = productsMock[0];
    const newState: ProductListState = productListReducer(
      initialState,
      productListActions.getProductSuccess({ product })
    );
    expect(newState).toEqual({ ...initialState, selectedProduct: product });
  });

  it('should failure get product', () => {
    const newState: ProductListState = productListReducer(
      initialState,
      productListActions.getProductFaliure({ errorMsg })
    );
    expect(newState).toEqual({ ...initialState });
  });

  it('should reduce product limit', () => {
    const fakeCart: CartState = {
      [productsMock[1].name]: 5,
      [productsMock[3].name]: 10,
    };
    const newState: ProductListState = productListReducer(
      { productList: productsMock, selectedProduct: null },
      productListActions.reduceLimits({ cart: fakeCart })
    );
    expect(newState.productList[1].limit).toEqual(
      productsMock[1].limit - fakeCart[productsMock[1].name]
    );
    expect(newState.productList[3].limit).toEqual(
      productsMock[3].limit - fakeCart[productsMock[3].name]
    );
  });
});
