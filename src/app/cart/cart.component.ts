import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from './../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { MatDialogRef } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  cartProducts$: Observable< {product: Product, amount: number}[] >;
  totalPrice$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit() {
    this.cartProducts$ =
    combineLatest([this.productService.getProducts$(), this.cartService.getCart$()]).pipe(
        map(([products, cart]) => {
          return Object.keys(cart).map(cartProductName => {
            return {
              product: products.find(p => p.name === cartProductName),
               amount: cart[cartProductName]};
          });
        })
      );

    this.totalPrice$ = this.totalPrice();
  }

  removeFromCart(productName: string) {
    this.cartService.removeFromCart(productName);
  }

  changeAmount(productAmount: number, productName: string, limit: number | undefined) {
    this.cartService.changeAmount(productName, productAmount, limit);
  }

  totalPrice(): Observable<number> {
    return this.cartProducts$.pipe(
      map(cartProducts => {
        return cartProducts.reduce((acc: number, cartProduct: {product: Product, amount: number}) => {
          if (cartProduct.product) {
            return acc + cartProduct.amount * cartProduct.product.price;
            }
          }, 0);
      })
    );
  }

  checkout() {
    this.cartService.getCart$().pipe(
      take(1)
    ).subscribe(cart => {
      this.productService.updateProductsLimits(cart);
    })
    this.cartService.checkout();
  }
}
