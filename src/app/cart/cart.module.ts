import { CartService } from './../services/cart/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { CartReducer } from './reducers/cart.reducer';
import { CartComponent } from './cart.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListReducer } from '../product-list/reducers/product-list.reducer';



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
    StoreModule.forRoot({ cart: CartReducer, productList: ProductListReducer})
  ],
  providers: [CartService]
})
export class CartModule { }
