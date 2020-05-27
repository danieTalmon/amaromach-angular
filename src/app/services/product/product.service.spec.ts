import { Cart } from './../../shared/models/cart.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { mock, instance, when } from 'ts-mockito';
import { Product } from 'src/app/shared/models/product.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { productsMock } from 'src/app/product-list/mock/mock-product';

describe('ProductService', () => {
  const productURL: string = 'assets/products.json';

  let service: ProductService;
  let injector: TestBed;
  let mockHttpService: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.get(ProductService);
    mockHttpService = TestBed.get(HttpTestingController);
    const loadProducts: TestRequest = mockHttpService.expectOne(productURL);
    loadProducts.flush(productsMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', (done) => {
    service.getProducts$().subscribe((products) => {
      expect(products).toEqual(productsMock);
      done();
    });
  });

  it('should get product by name', (done) => {
    service.getProduct$(productsMock[0].name).subscribe((product) => {
      expect(product.name).toEqual(productsMock[0].name);
      expect(product.price).toEqual(productsMock[0].price);
      done();
    });
  });

  it('should get product by name (wrong name)', (done) => {
    const fakeProductName: string = 'test10';
    service.getProduct$(fakeProductName).subscribe((product) => {
      expect(product).toEqual(undefined);
      done();
    });
  });

  it('should reduce product limit', (done) => {
    const fakeCart: Cart = {
      [productsMock[1].name]: 5,
      [productsMock[3].name]: 10,
    };
    const mockOldLimit1: number = productsMock[1].limit;
    const mockOldLimit2: number = productsMock[3].limit;
    service.updateProductsLimits(fakeCart);
    service.getProducts$().subscribe((products) => {
      expect(products[1].limit).toEqual(
        mockOldLimit1 - fakeCart[productsMock[1].name]
      );
      expect(products[3].limit).toEqual(
        mockOldLimit2 - fakeCart[productsMock[3].name]
      );
      done();
    });
  });
});
