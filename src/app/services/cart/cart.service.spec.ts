import { Observable } from 'rxjs';
import { Product } from './../../shared/models/product.model';
import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { productsMock } from '../../product-list/mock/product-list.mock';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an empty cart', (done) => {
    service.getCart$().subscribe((cart) => {
      expect(cart).toEqual({});
      done();
    });
  });

  describe('cartService with init mock', () => {
    beforeEach(() => {
      service.addToCart(productsMock[0].name);
    });

    it('should add a product to the cart', (done) => {
      service.addToCart(productsMock[1].name);
      service.getCart$().subscribe((cart) => {
        expect(Object.keys(cart).length).toEqual(2);
        expect(cart[productsMock[1].name]).toEqual(1);
        done();
      });
    });

    it('should remove a product from the cart', (done) => {
      service.removeFromCart(productsMock[0].name);
      service.getCart$().subscribe((cart) => {
        expect(Object.keys(cart).length).toEqual(0);
        expect(cart[productsMock[0].name]).toEqual(undefined);
        done();
      });
    });

    it('should change amount of cart product', (done) => {
      const newAmount: number = productsMock[0].limit - 1;
      service.changeAmount(productsMock[0], newAmount);
      service.getCart$().subscribe((cart) => {
        expect(cart[productsMock[0].name]).toEqual(newAmount);
        done();
      });
    });

    it('should not change amount of cart product, when given amount greater than the limit of the product', (done) => {
      const newAmount: number = productsMock[0].limit + 1;
      service.changeAmount(productsMock[0], newAmount);
      service.getCart$().subscribe((cart) => {
        expect(cart[productsMock[0].name]).not.toEqual(newAmount);
        done();
      });
    });

    it('should chackout', (done) => {
      service.checkout();
      service.getCart$().subscribe((cart) => {
        expect(cart).toEqual({});
        done();
      });
    });

    it('should return the number of cart products', (done) => {
      service.addToCart(productsMock[2].name);
      service.totalProducts().subscribe((cartLength) => {
        expect(cartLength).toEqual(2);
        done();
      });
    });
  });
});
