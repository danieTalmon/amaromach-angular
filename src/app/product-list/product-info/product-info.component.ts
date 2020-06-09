import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';
import { loadProduct as getProductAction } from '../actions/product-list.actions';
import {
  getProduct,
  ProductListState,
} from './../reducers/product-list.reducer';

@Component({
  selector: 'ar-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  product$: Observable<Product>;
  destroy$: Subject<void>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ProductListState>
  ) {}

  ngOnInit() {
    this.destroy$ = new Subject<void>();
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((parameter: Params) => {
        this.store.dispatch(getProductAction({ productName: parameter.id }));
      });
    this.product$ = this.store.select(getProduct);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
