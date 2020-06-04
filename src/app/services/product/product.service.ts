import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';

@Injectable()
export class ProductService {
  private readonly productURL: string = 'assets/products.json';

  constructor(private http: HttpClient) {}

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL);
  }

  getProduct$(productName: string): Observable<Product> {
    return this.getProducts$().pipe(
      map((products) =>
        products.find((product) => product.name === productName)
      )
    );
  }
}
