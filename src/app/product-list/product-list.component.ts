import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { add } from '../cart/actions/cart.actions';
import { selectCart } from '../cart/reducers/cart.reducer';
import { Product } from '../shared/models/product.model';
import { remove } from './../cart/actions/cart.actions';
import { AppState } from './../shared/models/store.model';
import { loadProducts } from './actions/product-list.actions';
import { selectProductList } from './reducers/product-list.reducer';

@Component({
  selector: 'ar-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products$: Observable<{ product: Product; isInCart: boolean }[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());

    this.products$ = combineLatest([
      this.store.select(selectProductList),
      this.store.select(selectCart),
    ]).pipe(
      map(([products, cart]) =>
        products.map((product) => ({ product, isInCart: !!cart[product.name] }))
      )
    );
  }

  addToCart(productName: string) {
    this.store.dispatch(add({ productName }));
  }

  removeFromCart(productName: string) {
    this.store.dispatch(remove({ productName }));
  }
}
