import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'ar-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductComponent implements OnInit {
  @Input()
  product: Product;
  @Input()
  amount: number;
  @Output()
  changeAmount: EventEmitter<number>;
  @Output()
  remove: EventEmitter<void>;

  imageUrl: string;
  arrayOfNumbers: number[];

  constructor() {
    this.changeAmount = new EventEmitter<number>();
    this.remove = new EventEmitter<void>();
  }

  ngOnInit() {
    this.amount = this.amount || 1;
    if (this.product) {
      this.imageUrl = `/assets/images/${this.product.name}.jpg`;
    }
    this.arrayOfNumbers = this.numbersArray();
  }

  changeProductAmount(productAmount: number) {
    this.changeAmount.emit(productAmount);
  }

  removeFromCart() {
    this.remove.emit();
  }

  private numbersArray() {
    return [...Array(this.product.limit).keys()].map((x) => ++x);
  }
}
