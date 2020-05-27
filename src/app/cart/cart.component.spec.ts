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
  const product: Product = {
    name: 'test1',
    description: 'test1 description',
    price: 40,
    limit: 5,
  };
  const amount: number = 3;
  const cart: Record<string, number> = { test1: amount };
  const products: Product[] = [product];

  let cartComponent: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService = mock(CartService);
  when(mockCartService.getCart$()).thenReturn(of(cart));
  let mockProductService = mock(ProductService);
  when(mockProductService.getProducts$()).thenReturn(of(products));
  let mockMatDialog = mock(MatDialogRef);

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
    cartComponent.removeFromCart('test2');

    verify(mockCartService.removeFromCart('test2')).called();
  });

  it('should change the amount of the cart product', () => {
    cartComponent.changeAmount(product, 3);

    verify(mockCartService.changeAmount(product, 3)).called();
  });

  it('should get the cart total price', (done) => {
    cartComponent.totalPrice$.subscribe((totalPrice) => {
      expect(totalPrice).toEqual(120);
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
