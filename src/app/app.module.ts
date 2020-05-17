import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductInfoComponent } from './product-info/product-info.component';

import { cartService } from './services/cart/cart.service.ts'
import { ProductService } from './services/cart/product.service.ts'

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    CartComponent,
    CartProductComponent,
    NavbarComponent,
    ProductInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
