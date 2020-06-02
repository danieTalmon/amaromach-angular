import { Product } from '../../shared/models/product.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartService {
  private cart$: BehaviorSubject<Record<string, number>>;

  constructor() {
    this.cart$ = new BehaviorSubject<Record<string, number>>({});
  }

  getCart$(): Observable<Record<string, number>> {
    return this.cart$.asObservable();
  }

  addToCart(productName) {
    const cart: Record<string, number> = this.cart$.getValue();
    cart[productName] = 1;

    this.cart$.next(cart);
  }

  removeFromCart(productName: string) {
    const cart: Record<string, number> = this.cart$.getValue();
    delete cart[productName];

    this.cart$.next(cart);
  }

  changeAmount(product: Product, newAmount: number) {
    const cart: Record<string, number> = this.cart$.getValue();
    if (!product.limit || newAmount <= product.limit) {
      cart[product.name] = newAmount;
    }

    this.cart$.next(cart);
  }

  checkout() {
    this.cart$.next({});
  }

  totalProducts(): Observable<number> {
    return this.cart$.pipe(map((cart) => Object.keys(cart).length));
  }
}
