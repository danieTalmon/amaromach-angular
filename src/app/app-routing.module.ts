import { ProductListComponent } from './product-list/product-list.component';
import { ProductInfoComponent } from './product-list/product-info/product-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'product/:id', component: ProductInfoComponent},
  {path: '**', redirectTo: '/products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
