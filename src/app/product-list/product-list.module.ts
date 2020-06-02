import { ProductEffects } from './effects/product-list.effects';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CartModule } from '../cart/cart.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { StoreModule } from '@ngrx/store';
import { ProductListReducer } from './reducers/product-list.reducer';
import { CartReducer } from '../cart/reducers/cart.reducer';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CartModule,
    StoreModule.forRoot({ productList: ProductListReducer, cart: CartReducer }),
    EffectsModule.forRoot([ProductEffects]),
  ],
  exports: [ProductListComponent, ProductComponent, ProductInfoComponent],
  providers: [],
})
export class ProductListModule {}
