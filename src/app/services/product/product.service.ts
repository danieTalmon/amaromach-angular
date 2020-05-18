import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ProductJson from 'src/assets/products.json';
import { Product } from 'src/app/product/product-list/product-list.component';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    const productURL: string = 'assets/products.json';
    return this.http.get(productURL)
   .pipe( map((response) => response as Product[] ),
    catchError((error: any) => {
      throw(error);
    }));
  }

  public getProduct(productName: string): Observable<Product> {
    return this.getProducts().pipe(map((products: Product[]) => products[productName]));
  }
}
