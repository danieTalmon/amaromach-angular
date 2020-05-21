import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Product } from './product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ar-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {


  @Input()
  product: Product;

  @Input()
  isInCart: boolean;

  @Output()
  add: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  remove: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  addToCart(productName: string) {
    this.add.emit(productName);
  }

  removeFromCart(productName: string) {
    this.remove.emit(productName);
  }

  isOutOfStuck() {
    return this.product.limit === 0;
  }

}
