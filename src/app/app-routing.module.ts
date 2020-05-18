import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductInfoComponent } from './product/product-info/product-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'amaromach/ng/products', component: ProductListComponent},
  {path: 'amaromach/ng/product/:id', component: ProductInfoComponent},
  {path: '**', redirectTo: '/amaromach/ng/products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
