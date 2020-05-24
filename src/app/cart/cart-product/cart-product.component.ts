import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/product/product-list/product-list.component';
import { FormControl } from '@angular/forms';

export interface ProductAmount {
  name: string;
  amount: number;
}

@Component({
  selector: 'ar-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.less']
})
export class CartProductComponent implements OnInit {


  @Input()
  product: Product;

  @Input()
  amount: number;

  @Output()
  changeAmount: EventEmitter<ProductAmount> = new EventEmitter<ProductAmount>();

  @Output()
  remove: EventEmitter<string> = new EventEmitter<string>();

  selectedAmount: number;

  constructor() { }

  ngOnInit() {
    this.selectedAmount = this.amount;
    this.amount = this.amount || 1;
  }

  changeProductAmount(productAmount: number) {
     const name: string = this.product.name;
     const amountObject: ProductAmount = {name, amount: productAmount};
     this.changeAmount.emit(amountObject);
     this.selectedAmount = this.amount;
  }


  removeFromCart(productName: string) {
    this.remove.emit(productName);
  }

  numbersArray() {
    return [...Array(this.product.limit).keys()].map(x => ++x);
  }



}
