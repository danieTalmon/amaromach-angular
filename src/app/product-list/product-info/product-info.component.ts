import { selectProduct } from './../reducers/product-list.reducer';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/models/store.model';

@Component({
  selector: 'ar-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.less'],
})
export class ProductInfoComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.product$ = this.route.params.pipe(
      switchMap((parameter: Params) =>
        this.store.select(selectProduct, { id: parameter.id })
      )
    );
  }
}
