import { CartService } from './../../services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  name: string;
  description: string;
  price: number;
  amount: number;
  limit?: number;
}


@Component({
  selector: 'ar-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  isProductInCart: Record<string, boolean>;


  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
     this.productService.getProducts$().subscribe((products) => {
      this.products = products;
      console.log(this.products);
      this.productService.getIsInCart().subscribe(isInCart => {
        this.isProductInCart = isInCart;
      });
    });
  }


  addToCart(productName: string) {
    this.cartService.addToCart(productName);
    this.isProductInCart[productName] = true;
    this.productService.updateIsInCart(this.isProductInCart);
  }

  removeFromCart(productName: string) {
    this.cartService.removeFromCart(productName);
    this.isProductInCart[productName] = false;

    this.productService.updateIsInCart(this.isProductInCart);
  }


}
