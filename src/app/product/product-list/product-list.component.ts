import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  name: string;
  description: string;
  price: number;
  amount: number;
  limit?: number;
}

@Component({
  selector: 'ar-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  productsStremar: BehaviorSubject<Product[]>;


  constructor(private productService: ProductService ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(typeof products);
      this.productsStremar = new BehaviorSubject<Product[]>(this.products);
    });
  }

}
