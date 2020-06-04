import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { instance, mock } from 'ts-mockito';

import { mockProduct } from './../product-list/mock/product-list.mock';
import {
  getProductList,
  ProductListState,
} from './../product-list/reducers/product-list.reducer';
import { Cart } from './../shared/models/cart.model';
import { Product } from './../shared/models/product.model';
import { changeAmount, checkout, removeProduct } from './actions/cart.actions';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartComponent } from './cart.component';
import { CartState, getCart } from './reducers/cart.reducer';

describe('CartComponent', () => {
  const amount: number = 3;
  const cart: Cart = { [mockProduct.name]: amount };
  const products: Product[] = [mockProduct];

  let cartComponent: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const mockMatDialog: MatDialogRef<CartComponent> = mock(MatDialogRef);
  let mockStore: MockStore<CartState | ProductListState>;
  let mockCartSelector;
  let mockProductListSelector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent, CartProductComponent],
      imports: [MatSelectModule],
      providers: [
        provideMockStore(),
        { provide: MatDialogRef, useValue: instance(mockMatDialog) },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartComponent = fixture.componentInstance;
    mockStore = TestBed.get(MockStore);
    mockCartSelector = mockStore.overrideSelector(getCart, cart);
    mockProductListSelector = mockStore.overrideSelector(
      getProductList,
      products
    );
    spyOn(mockStore, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(cartComponent).toBeTruthy();
  });

  it('should init cartProduct observable', (done) => {
    const cartProduct = { product: mockProduct, amount };
    cartComponent.cartProducts$.subscribe((CartProducts) => {
      expect(CartProducts[0]).toEqual(cartProduct);
      done();
    });
  });

  it('should remove from cart', () => {
    cartComponent.removeFromCart(mockProduct.name);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeProduct({ productName: mockProduct.name })
    );
  });

  it('should change the amount of the cart product', () => {
    const newAmount: number = 3;
    cartComponent.changeAmount(mockProduct, newAmount);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      changeAmount({ product: mockProduct, newAmount })
    );
  });

  it('should get the cart total price', (done) => {
    cartComponent.totalPrice$.subscribe((totalPrice) => {
      expect(totalPrice).toEqual(amount * mockProduct.price);
      done();
    });
  });

  it('should checkout', () => {
    cartComponent.checkout();

    expect(mockStore.dispatch).toHaveBeenCalledWith(checkout({ cart }));
  });
});
