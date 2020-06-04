import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CartModule } from '../cart/cart.module';
import { cartReducer } from '../cart/reducers/cart.reducer';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, CartModule, RouterModule, MatMenuModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
