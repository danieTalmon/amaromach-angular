import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart$: BehaviorSubject<Record<string, number>> = new BehaviorSubject<Record<string, number>>({});

  constructor() { }

  getCart(): Observable<Record<string, number>> {
    return this.cart$.asObservable();
  }

  addToCart(productName) {
    let cart: Record<string, number> = this.cart$.getValue();
    cart[productName] = 1;

    this.updateCart(cart);
  }

  removeFromCart(productName: string) {
    let cart: Record<string, number> = this.cart$.getValue();
    delete cart[productName];


    this.updateCart(cart);
  }

  changeAmount(productName: string, newAmount: number, limit: number | null) {
    let cart: Record<string, number> = this.cart$.getValue();
    if (!limit || newAmount < limit) {
      cart[productName] = newAmount;
    }
  }

  updateCart(cart: Record<string, number>) {
    this.cart$.next(cart);
  }

  totalProducts() {
    const cart: Record<string, number> = this.cart$.getValue();
    return Object.keys(cart).length;
  }
}
