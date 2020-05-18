import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Product } from './product-list/product-list.component';

@Component({
  selector: 'ar-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  isOutOfStock: boolean = false;

  @Input()
  product: Product;

  @Output()
  productEmitter = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.productEmitter.emit(product);
  }

}
