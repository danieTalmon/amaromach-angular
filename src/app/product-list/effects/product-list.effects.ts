import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import * as ProductListActions from '../actions/product-list.actions';
import { Product } from './../../shared/models/product.model';

@Injectable()
export class ProductEffects {
  readonly GET_PRODUCT = '[Product] Get Product';
  readonly LOAD_PRODUCTS = '[Product] Load Products';
  private readonly productURL: string = 'assets/products.json';

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.LOAD_PRODUCTS),
      mergeMap(() =>
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
      ofType(this.GET_PRODUCT),
      mergeMap(({ productName }) =>
        this.productService.getProduct$(productName).pipe(
          map((product) => ProductListActions.getProductSuccess({ product })),
          catchError((err) =>
            of(
              ProductListActions.getProductFaliure({
                errorMsg: err.message,
              })
            )
          )
        )
      )
    )
  );

  private loadProducts() {
    return this.http.get<Product[]>(this.productURL);
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private productService: ProductService
  ) {}
}
