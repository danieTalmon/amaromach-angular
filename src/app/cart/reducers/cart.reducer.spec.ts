import { CartState } from './../../shared/models/cart.model';
import { CartReducer } from './cart.reducer';
import * as cartActions from '../actions/cart.actions';
import { productsMock } from 'src/app/product-list/mock/product-list.mock';
describe('Reducer: cart', () => {
  const productName: string = productsMock[0].name;
  const state = CartReducer({}, cartActions.add({ productName }));

  it('should add a product to the cart', () => {
    const newState: CartState = CartReducer(
      state,
      cartActions.add({ productName: productsMock[1].name })
    );
    expect(newState[productsMock[1].name]).toEqual(1);
    expect(Object.keys(newState).length).toEqual(2);
  });

  it('should remove a product from the cart', () => {
    const newState: CartState = CartReducer(
      state,
      cartActions.remove({ productName: productsMock[0].name })
    );
    expect(newState[productsMock[1].name]).toEqual(undefined);
    expect(Object.keys(newState).length).toEqual(0);
  });

  it('should change amount of a cart product', () => {
    const newAmount: number = productsMock[0].limit - 1;
    const newState: CartState = CartReducer(
      state,
      cartActions.changeAmount({ product: productsMock[0], newAmount })
    );
    expect(newState[productsMock[0].name]).toEqual(newAmount);
  });

  it('should not change amount of a cart product', () => {
    const newAmount: number = productsMock[0].limit + 1;
    const newState: CartState = CartReducer(
      state,
      cartActions.changeAmount({ product: productsMock[0], newAmount })
    );
    expect(newState[productsMock[0].name]).not.toEqual(newAmount);
  });

  it('should checkout', () => {
    const newState: CartState = CartReducer(state, cartActions.checkout());
    expect(newState).toEqual({});
  });
});
