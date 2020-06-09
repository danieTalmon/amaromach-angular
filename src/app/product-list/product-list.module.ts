import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from 'src/app/services/product/product.service';
import { CartModule } from '../cart/cart.module';
import { cartReducer } from '../cart/reducers/cart.reducer';
import { SharedModule } from '../shared/shared.module';
import { ProductEffects } from './effects/product-list.effects';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product/product.component';
import {
  productListReducer,
  productListToken,
} from './reducers/product-list.reducer';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CartModule,
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature(productListToken, productListReducer),
  ],
  exports: [ProductListComponent, ProductComponent, ProductInfoComponent],
  providers: [ProductService],
})
export class ProductListModule {}
