import { CartState } from './../cart/reducers/cart.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { addProduct } from '../cart/actions/cart.actions';
import { getCart } from '../cart/reducers/cart.reducer';
import { Product } from '../shared/models/product.model';
import { removeProduct } from './../cart/actions/cart.actions';
import { loadProducts } from './actions/product-list.actions';
import {
  getProductList,
  ProductListState,
} from './reducers/product-list.reducer';

@Component({
  selector: 'ar-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products$: Observable<{ product: Product; isInCart: boolean }[]>;

  constructor(private store: Store<CartState | ProductListState>) {}

  ngOnInit() {
    this.products$ = combineLatest([
      this.store.select(getProductList),
      this.store.select(getCart),
    ]).pipe(
      map(([products, cart]) =>
        products.map((product) => ({ product, isInCart: !!cart[product.name] }))
      )
    );
  }

  addToCart(productName: string) {
    this.store.dispatch(addProduct({ productName }));
  }

  removeFromCart(productName: string) {
    this.store.dispatch(removeProduct({ productName }));
  }
}
