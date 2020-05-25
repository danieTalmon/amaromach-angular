import { CartService } from './../services/cart/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { CartComponent } from './cart.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    CartProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [CartService]
})
export class CartModule { }
