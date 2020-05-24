import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartService {
  private cart$: BehaviorSubject<Record<string, number>> = new BehaviorSubject<Record<string, number>>({});

  constructor() { }

  getCart$(): Observable<Record<string, number>> {
    return this.cart$.asObservable();
  }

  addToCart(productName) {
    let cart: Record<string, number> = this.cart$.getValue();
    cart[productName] = 1;

    this.cart$.next(cart);
  }

  removeFromCart(productName: string) {
    let cart: Record<string, number> = this.cart$.getValue();
    delete cart[productName];

    this.cart$.next(cart);
  }

  changeAmount(productName: string, newAmount: number, limit: number | null) {
    let cart: Record<string, number> = this.cart$.getValue();
    if (!limit || newAmount <= limit) {
      cart[productName] = newAmount;
    }

    this.cart$.next(cart);
  }

  checkout() {
    this.cart$.next({});
  }

  totalProducts() {
    return this.cart$.pipe(
      map(cart => Object.keys(cart).length)
    );
  }
}
