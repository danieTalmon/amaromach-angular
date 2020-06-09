import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';
import { reduceLimits } from './../product-list/actions/product-list.actions';
import {
  getProductList,
  ProductListState,
} from './../product-list/reducers/product-list.reducer';
import { changeAmount, checkout, removeProduct } from './actions/cart.actions';
import { getCart, CartState } from './reducers/cart.reducer';

@Component({
  selector: 'ar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
})
export class CartComponent implements OnInit {
  cartProducts$: Observable<{ product: Product; amount: number }[]>;
  totalPrice$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private store: Store<CartState | ProductListState>
  ) {}

  ngOnInit() {
    this.cartProducts$ = combineLatest([
      this.store.select(getProductList),
      this.store.select(getCart),
    ]).pipe(
      map(([products, cart]) =>
        Object.keys(cart).map((cartProductName) => ({
          product: products.find((product) => product.name === cartProductName),
          amount: cart[cartProductName],
        }))
      )
    );

    this.totalPrice$ = this.totalPrice();
  }

  removeFromCart(productName: string) {
    this.store.dispatch(removeProduct({ productName }));
  }

  changeAmount(product: Product, newAmount: number) {
    this.store.dispatch(changeAmount({ product, newAmount }));
  }

  checkout() {
    this.store
      .select(getCart)
      .pipe(take(1))
      .subscribe((cart) => {
        this.store.dispatch(checkout({ cart }));
      });
  }

  private totalPrice(): Observable<number> {
    return this.cartProducts$.pipe(
      map((cartProducts) => {
        return cartProducts.reduce(
          (acc: number, cartProduct: { product: Product; amount: number }) => {
            if (cartProduct.product) {
              return acc + cartProduct.amount * cartProduct.product.price;
            }
          },
          0
        );
      })
    );
  }
}
