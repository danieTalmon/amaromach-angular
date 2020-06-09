import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { productListReducer } from '../product-list/reducers/product-list.reducer';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartComponent } from './cart.component';
import { cartReducer, cartStateToken } from './reducers/cart.reducer';

@NgModule({
  declarations: [CartComponent, CartProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    StoreModule.forFeature(cartStateToken, cartReducer),
  ],
  providers: [],
})
export class CartModule {}
