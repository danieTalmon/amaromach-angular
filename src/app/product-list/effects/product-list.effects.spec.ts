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
  getProduct,
  getProductFaliure,
  getProductSuccess,
  loadProducts,
  loadProductsFaliure,
  loadProductsSuccess,
} from '../actions/product-list.actions';
import { productsMock } from '../mock/product-list.mock';
import { ProductEffects } from './product-list.effects';

describe('CartComponent', () => {
  let productsEffect: ProductEffects;
  let actions$: Observable<any>;
  let mockHttpService: HttpTestingController;
  let mockProductService: ProductService;
  const errorMsg: string = 'unable to load products';

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
    mockHttpService = TestBed.get(HttpTestingController);
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
    const loadProductsAction: Action = getProduct({
      productName: productsMock[0].name,
    });
    const loadProductsCompletion: Action = getProductSuccess({
      product: productsMock[0],
    });

    actions$ = hot('-a', { a: loadProductsAction });
    const expected = cold('--b', { b: loadProductsCompletion });
    mockProductService.getProduct$ = jest.fn(() =>
      cold('-a|', { a: productsMock[0] })
    );

    expect(productsEffect.getProduct$).toBeObservable(expected);
  });

  it('should dispatch a failure action on faliure of get product action', () => {
    const loadProductsAction: Action = getProduct({ productName: 'test11' });
    const loadProductsCompletion: Action = getProductFaliure({
      errorMsg,
    });

    actions$ = hot('-a-|', { a: loadProductsAction });
    const expected = cold('--b|', { b: loadProductsCompletion });
    mockProductService.getProduct$ = jest.fn(() =>
      cold('-#', {}, new Error(errorMsg))
    );

    expect(productsEffect.getProduct$).toBeObservable(expected);
  });
});
