import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from './../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product-list/product-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductAmount } from './cart-product/cart-product.component';

@Component({
  selector: 'ar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  cart: Record<string, number> = {};
  fullDetailsCart: Product[] = [];
  products: Product[] = [];
  isInCart: Record<string, boolean> = {};

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.getfullDetailsCart();
    });
    this.productService.getProducts$().subscribe(products => {
      this.products = products;
    });
    this.productService.getIsInCart().subscribe(isInCart => {
      this.isInCart = isInCart;
    });
  }

  getfullDetailsCart() {
    let fullDetailsCart = [];
    Object.keys(this.cart).forEach(productName => {
      this.productService.getProduct(productName).subscribe(product => {
        fullDetailsCart.push(product);
      });
    });
    this.fullDetailsCart = fullDetailsCart;
    }

  removeFromCart(productName: string) {
    this.cartService.removeFromCart(productName);
    this.isInCart[productName] = false;
    this.productService.updateIsInCart(this.isInCart);
  }

  changeAmount(productAmount: ProductAmount) {
    this.cart[productAmount.name] = productAmount.amount;
    this.cartService.updateCart(this.cart);
  }

  totalPrice() {
    return this.fullDetailsCart.reduce((acc: number, product: Product) => {
      if (product) {
        return acc + this.cart[product.name] * product.price;
      }
    }, 0);
  }

  checkout() {
    this.products.forEach(product => {
      if (product.limit) {
        product.limit -= this.cart[product.name];
      }
    });
    this.productService.updateProducts(this.products);

    Object.keys(this.cart).forEach(productName => {
      this.removeFromCart(productName);
      });
  }


}
