import { mockProduct } from '../product-list/mock/product-list.mock';
import { Cart } from './../shared/models/cart.model';
import { Product } from './../shared/models/product.model';
import { MatSelectModule } from '@angular/material/select';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ProductService } from './../services/product/product.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { mock, instance, when, verify } from 'ts-mockito';
import { CartService } from '../services/cart/cart.service';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('CartComponent', () => {
  const amount: number = 3;
  const cart: Cart = { test1: amount };
  const products: Product[] = [mockProduct];

  let cartComponent: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const mockCartService: CartService = mock(CartService);
  when(mockCartService.getCart$()).thenReturn(of(cart));
  const mockProductService: ProductService = mock(ProductService);
  when(mockProductService.getProducts$()).thenReturn(of(products));
  const mockMatDialog: MatDialogRef<CartComponent> = mock(MatDialogRef);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent, CartProductComponent],
      imports: [MatSelectModule],
      providers: [
        { provide: CartService, useValue: instance(mockCartService) },
        { provide: ProductService, useValue: instance(mockProductService) },
        { provide: MatDialogRef, useValue: instance(mockMatDialog) },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(cartComponent).toBeTruthy();
  });

  it('should remove from cart', () => {
    cartComponent.removeFromCart(mockProduct.name);

    verify(mockCartService.removeFromCart(mockProduct.name)).called();
  });

  it('should change the amount of the cart product', () => {
    const newAmount: number = 3;
    cartComponent.changeAmount(mockProduct, newAmount);

    verify(mockCartService.changeAmount(mockProduct, newAmount)).called();
  });

  it('should get the cart total price', (done) => {
    cartComponent.totalPrice$.subscribe((totalPrice) => {
      expect(totalPrice).toEqual(amount * mockProduct.price);
      done();
    });
  });

  it('should checkout', (done) => {
    cartComponent.checkout();

    verify(mockCartService.checkout()).called();
    verify(mockProductService.updateProductsLimits(cart)).called();
    done();
  });
});
