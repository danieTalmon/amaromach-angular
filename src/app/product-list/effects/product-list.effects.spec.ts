import { Cart } from './../../shared/models/cart.model';
import { reduceLimits } from './../actions/product-list.actions';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import {
  loadProduct,
  loadProductFaliure,
  loadProductSuccess,
  loadProducts,
  loadProductsFaliure,
  loadProductsSuccess,
} from '../actions/product-list.actions';
import { productsMock } from '../mock/product-list.mock';
import { ProductEffects } from './product-list.effects';
import { checkout } from 'src/app/cart/actions/cart.actions';

describe('CartComponent', () => {
  let productsEffect: ProductEffects;
  let actions$: Observable<any>;
  let mockProductService: ProductService;
  const errorMsg: string = 'Error';
  const amount: number = 3;
  const fakeCart: Cart = { [productsMock[0].name]: amount };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        {
          provide: ProductService,
          useValue: { getProducts$: jest.fn(), getProduct$: jest.fn() },
        },
      ],
    });

    actions$ = TestBed.get(Actions);
    productsEffect = TestBed.get(ProductEffects);
    mockProductService = TestBed.get(ProductService);
  }));

  it('should load products on success', () => {
    const loadProductsAction: Action = loadProducts();
    const loadProductsCompletion: Action = loadProductsSuccess({
      productList: productsMock,
    });

    actions$ = hot('-a', { a: loadProductsAction });
    const expected = cold('--b', { b: loadProductsCompletion });
    mockProductService.getProducts$ = jest.fn(() =>
      cold('-a|', { a: productsMock })
    );

    expect(productsEffect.loadProducts$).toBeObservable(expected);
  });

  it('should dispatch a failure action on faliure of load products action', () => {
    const loadProductsAction: Action = loadProducts();
    const loadProductsCompletion: Action = loadProductsFaliure({
      errorMsg,
    });

    actions$ = hot('-a-|', { a: loadProductsAction });
    const expected = cold('--b|', { b: loadProductsCompletion });
    mockProductService.getProducts$ = jest.fn(() =>
      cold('-#', {}, new Error(errorMsg))
    );

    expect(productsEffect.loadProducts$).toBeObservable(expected);
  });

  it('should get product on success', () => {
    const getProductAction: Action = loadProduct({
      productName: productsMock[0].name,
    });
    const getProductCompletion: Action = loadProductSuccess({
      product: productsMock[0],
    });

    actions$ = hot('-a', { a: getProductAction });
    const expected = cold('--b', { b: getProductCompletion });
    mockProductService.getProduct$ = jest.fn(() =>
      cold('-a|', { a: productsMock[0] })
    );

    expect(productsEffect.getProduct$).toBeObservable(expected);
  });

  it('should dispatch a failure action on faliure of get product action', () => {
    const getProductAction: Action = loadProduct({ productName: 'test11' });
    const getProductCompletion: Action = loadProductFaliure({
      errorMsg,
    });

    actions$ = hot('-a-|', { a: getProductAction });
    const expected = cold('--b|', { b: getProductCompletion });
    mockProductService.getProduct$ = jest.fn(() =>
      cold('-#', {}, new Error(errorMsg))
    );

    expect(productsEffect.getProduct$).toBeObservable(expected);
  });

  it('should dispatch reduceLimits Action when Checkout Action dispatched ', () => {
    const chackoutAction: Action = checkout({
      cart: fakeCart,
    });
    const chackoutCompletion: Action = reduceLimits({
      cart: fakeCart,
    });

    actions$ = hot('-a', { a: chackoutAction });
    const expected = cold('-b', { b: chackoutCompletion });

    expect(productsEffect.reduceLimits$).toBeObservable(expected);
  });
});
