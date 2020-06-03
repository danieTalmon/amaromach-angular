import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'ar-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  @Input()
  isInCart: boolean;
  @Output()
  add: EventEmitter<void>;
  @Output()
  remove: EventEmitter<void>;

  imageUrl: string;

  constructor(private route: ActivatedRoute) {
    this.add = new EventEmitter<void>();
    this.remove = new EventEmitter<void>();
  }

  ngOnInit() {
    if (this.product) {
      this.imageUrl = `/assets/images/${this.product.name}.jpg`;
    }
  }

  addToCart() {
    this.add.emit();
  }

  removeFromCart() {
    this.remove.emit();
  }

  isOutOfStuck(): boolean {
    return this.product.limit === 0;
  }
}
