import { ProductService } from './../services/product/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './product-info/product-info.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ProductListComponent],
  providers: [ProductService]
})
export class ProductModule { }
