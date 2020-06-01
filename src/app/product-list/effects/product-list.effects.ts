import { Product } from './../../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product/product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ProductListActions from '../actions/product-list.actions';

@Injectable()
export class ProductEffects {
  readonly loadProductsAction = '[Product] Load Products';
  private readonly productURL: string = 'assets/products.json';

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.loadProductsAction),
      mergeMap(() =>
        this.loadProducts().pipe(
          map(
            (productList) =>
              ProductListActions.loadProductsSuccess({ productList }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  private loadProducts() {
    return this.http.get<Product[]>(this.productURL);
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
