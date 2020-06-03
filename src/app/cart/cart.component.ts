import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../shared/models/product.model';
import { reduceLimits } from './../product-list/actions/product-list.actions';
import { selectProductList } from './../product-list/reducers/product-list.reducer';
import { AppState } from './../shared/models/store.model';
import { changeAmount, checkout, remove } from './actions/cart.actions';
import { selectCart } from './reducers/cart.reducer';

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
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.cartProducts$ = combineLatest([
      this.store.select(selectProductList),
      this.store.select(selectCart),
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
    this.store.dispatch(remove({ productName }));
  }

  changeAmount(product: Product, newAmount: number) {
    this.store.dispatch(changeAmount({ product, newAmount }));
  }

  checkout() {
    this.store
      .select(selectCart)
      .pipe(take(1))
      .subscribe((cart) => {
        this.store.dispatch(reduceLimits({ cart }));
        this.store.dispatch(checkout());
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
