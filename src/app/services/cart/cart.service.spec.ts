import { Observable } from 'rxjs';
import { Product } from './../../shared/models/product.model';
import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new CartService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the cart', (done) => {
    const cart$ = service.getCart$();
    cart$.subscribe((cart) => {
      expect(cart).toEqual({});
      done();
    });
  });

  describe('cartService with init mock', () => {
    beforeEach(() => {
      service.addToCart('Oatmeal');
    });

    afterEach(() => {
      service.checkout();
    });

    it('should add a product to cart', (done) => {
      const productName = 'testProduct';
      service.addToCart(productName);
      const cart$ = service.getCart$();
      cart$.subscribe((cart) => {
        expect(Object.keys(cart).length).toEqual(2);
        expect(cart[productName]).toEqual(1);
        done();
      });
    });

    it('should remove a product from the cart', (done) => {
      const productName: string = 'Oatmeal';
      service.removeFromCart(productName);
      const cart$: Observable<Record<string, number>> = service.getCart$();
      cart$.subscribe((cart) => {
        expect(Object.keys(cart).length).toEqual(0);
        expect(cart[productName]).toEqual(undefined);
        done();
      });
    });

    it('should change amount of cart product', (done) => {
      const product: Product = {
        name: 'testProduct',
        description: 'testProduct description',
        price: 120,
        limit: 12,
      };
      const newAmount: number = 6;
      service.addToCart(product.name);
      service.changeAmount(product, newAmount);
      const cart$ = service.getCart$();
      cart$.subscribe((cart) => {
        expect(cart[product.name]).toEqual(newAmount);
        done();
      });
    });

    it('should not change amount of cart product', (done) => {
      const product: Product = {
        name: 'testProduct',
        description: 'testProduct description',
        price: 120,
        limit: 12,
      };
      const newAmount: number = 20;
      service.addToCart(product.name);
      service.changeAmount(product, newAmount);
      const cart$ = service.getCart$();
      cart$.subscribe((cart) => {
        expect(cart[product.name]).not.toEqual(newAmount);
        done();
      });
    });

    it('should chackout', (done) => {
      service.checkout();
      const cart$ = service.getCart$();
      cart$.subscribe((cart) => {
        expect(cart).toEqual({});
        done();
      });
    });

    it('should return the number of cart products', (done) => {
      const productName = 'testProduct';
      service.addToCart(productName);
      const cartLength$ = service.totalProducts();
      cartLength$.subscribe((cartLength) => {
        expect(cartLength).toEqual(2);
        done();
      });
    });
  });
});
