import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { mock, instance, when } from 'ts-mockito';
import { Product } from 'src/app/shared/models/product.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductService', () => {
  const productsMock: Product[] = [
    { name: 'test1', description: 'test1 description', price: 120, limit: 20 },
    { name: 'test2', description: 'test2 description', price: 150, limit: 5 },
    { name: 'test3', description: 'test3 description', price: 190 },
    { name: 'test4', description: 'test4 description', price: 220, limit: 29 },
    { name: 'test5', description: 'test5 description', price: 1120, limit: 45 },
    { name: 'test6', description: 'test6 description', price: 1728, limit: 10 },
  ];
  const productURL = 'assets/products.json';

  let service: ProductService;
  let injector: TestBed;
  let mockHttpService: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    injector = getTestBed();
    service = injector.inject(ProductService);
    mockHttpService = injector.inject(HttpTestingController);
    const loadProducts = mockHttpService.expectOne(productURL);
    loadProducts.flush(productsMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should has products', (done) => {
    const products$ = service.getProducts$();
    products$.subscribe((products) => {
      expect(products).toEqual(productsMock);
      done();
    });
  });
});
