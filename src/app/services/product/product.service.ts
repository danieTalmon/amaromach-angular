import { map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product.model';
import { ProductComponent } from 'src/app/product-list/product/product.component';

@Injectable()
export class ProductService {
  private readonly productURL: string = 'assets/products.json';
  private products$: BehaviorSubject<Product[]>;

  constructor(private http: HttpClient) {
    this.products$ = new BehaviorSubject<Product[]>([]);
    this.loadProducts();
  }

  getProducts$(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getProduct$(productName: string): Observable<Product> {
    return this.products$.pipe(
      map((products) =>
        products.find((product) => product.name === productName)
      )
    );
  }

  updateProductsLimits(cart: Record<string, number>) {
    let products = this.products$.getValue();
    Object.keys(cart).forEach((productName) => {
      const productIndex: number = products.findIndex(
        (product) => product.name === productName
      );
      products[productIndex].limit -= cart[productName];
    });
    this.products$.next(products);
  }

  private loadProducts() {
    return this.http.get<Product[]>(this.productURL).subscribe(
      (products) => {
        this.products$.next(products);
      },
      (err) => {
        throw err;
      }
    );
  }
}
