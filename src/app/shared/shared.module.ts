import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CartModule } from '../cart/cart.module';
import { CartReducer } from '../cart/reducers/cart.reducer';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    CartModule,
    RouterModule,
    MatMenuModule,
    StoreModule.forRoot({ cart: CartReducer }),
  ],
  exports: [NavbarComponent],
})
export class SharedModule {}
