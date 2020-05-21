import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ar-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.less']
})
export class ProductInfoComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    const productName: string = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(productName).subscribe((product) => {
      this.product = product;
    });
  }

}
