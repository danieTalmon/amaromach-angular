import { map, catchError } from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ProductJson from 'src/assets/products.json';
import { Product } from 'src/app/product/product-list/product-list.component';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private isProductInCart$: BehaviorSubject<Record<string, boolean>> = new BehaviorSubject<Record<string, boolean>> ({});

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getProducts$() {
    return this.products$.asObservable();
  }

  getIsInCart() {
    return this.isProductInCart$.asObservable();
  }

  initIsProductInCart(products: Product[]) {
    let isProductInCart: Record<string, boolean> = {};
    products.forEach( (product) => {
      isProductInCart[product.name] = false;
    });
    this.updateIsInCart(isProductInCart);
  }

  getProducts() {
    const productURL: string = 'assets/products.json';
    this.http.get<Product[]>(productURL).subscribe( products => {
      this.updateProducts(products);
      this.initIsProductInCart(products);
    }, err =>  {
      throw(err);
    });
  }

  getProduct(productName: string): Observable<Product> {
    const products: Product[] = this.products$.getValue();
    return of(products.find(product => product.name === productName));
  }

  updateProducts(products: Product[]) {
    this.products$.next(products);
  }

  updateIsInCart(products: Record<string, boolean>) {
    this.isProductInCart$.next(products);
  }
}
