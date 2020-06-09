import { productListActions } from './../actions/product-list.actions';
import { createAction } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { checkout } from 'src/app/cart/actions/cart.actions';
import { ProductService } from 'src/app/services/product/product.service';

import * as ProductListActions from '../actions/product-list.actions';

@Injectable()
export class ProductEffects implements OnInitEffects {
  private readonly productURL: string = 'assets/products.json';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts$().pipe(
          map((productList) =>
            ProductListActions.loadProductsSuccess({ productList })
          ),
          catchError((err) =>
            of(
              ProductListActions.loadProductsFaliure({
                errorMsg: err.message,
              })
            )
          )
        )
      )
    )
  );

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.loadProduct),
      switchMap(({ productName }) =>
        this.productService.getProduct$(productName).pipe(
          map((product) => ProductListActions.loadProductSuccess({ product })),
          catchError((err) =>
            of(
              ProductListActions.loadProductFaliure({
                errorMsg: err.message,
              })
            )
          )
        )
      )
    )
  );

  reduceLimits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkout),
      map(({ cart }) => ProductListActions.reduceLimits({ cart }))
    )
  );

  ngrxOnInitEffects(): Action {
    return ProductListActions.loadProducts();
  }
}
