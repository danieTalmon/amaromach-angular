import { CartService } from './../services/cart/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart.component';
import { CartProductComponent } from './cart-product/cart-product.component';



@NgModule({
  declarations: [
    CartComponent,
    CartProductComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [CartService]
})
export class CartModule { }
