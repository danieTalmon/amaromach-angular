import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CartModule } from '../cart/cart.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CartModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
