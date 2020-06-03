import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { productsMock } from 'src/app/product-list/mock/product-list.mock';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let mockHttpService: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.get(ProductService);
    mockHttpService = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', (done) => {
    service.getProducts$().subscribe((products) => {
      expect(products).toEqual(productsMock);
      done();
    });

    const loadProducts: TestRequest = mockHttpService.expectOne(
      service['productURL']
    );
    loadProducts.flush(productsMock);
  });

  it('should get product by name', (done) => {
    service.getProduct$(productsMock[0].name).subscribe((product) => {
      expect(product.name).toEqual(productsMock[0].name);
      expect(product.price).toEqual(productsMock[0].price);
      done();
    });

    const loadProducts: TestRequest = mockHttpService.expectOne(
      service['productURL']
    );
    loadProducts.flush(productsMock);
  });

  it('should get undefined when try to get product by name', (done) => {
    const fakeProductName: string = 'test10';
    service.getProduct$(fakeProductName).subscribe((product) => {
      expect(product).toEqual(undefined);
      done();
    });

    const loadProducts: TestRequest = mockHttpService.expectOne(
      service['productURL']
    );
    loadProducts.flush(productsMock);
  });
});
