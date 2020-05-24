import { CartService } from '../services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ar-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$: Observable<{product: Product, isInCart: boolean}[] >;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
     this.products$ = combineLatest([this.productService.getProducts$(), this.cartService.getCart$()])
     .pipe(
       map(([products, cart]) => {
          return products.map(product => {
           return {product, isInCart: (!!cart[product.name])};
         });
       }));
  }

  addToCart(productName: string) {
    this.cartService.addToCart(productName);
  }

  removeFromCart(productName: string) {
    this.cartService.removeFromCart(productName);
  }
}
