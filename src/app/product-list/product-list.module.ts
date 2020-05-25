import { RouterModule } from '@angular/router';
import { CartModule } from '../cart/cart.module';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductListComponent } from './product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductInfoComponent } from './product-info/product-info.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CartModule
  ],
  exports: [
    ProductListComponent,
    ProductComponent,
    ProductInfoComponent
  ],
  providers: [ProductService]
})
export class ProductListModule { }
