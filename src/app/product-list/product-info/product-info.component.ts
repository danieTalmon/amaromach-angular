import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/shared/models/store.model';
import { Product } from '../../shared/models/product.model';
import { getProduct } from '../actions/product-list.actions';
import { selectProduct } from './../reducers/product-list.reducer';

@Component({
  selector: 'ar-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.less'],
})
export class ProductInfoComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((parameter: Params) => {
      this.store.dispatch(getProduct({ productName: parameter.id }));
      this.product$ = this.store.select(selectProduct);
    });
  }
}
