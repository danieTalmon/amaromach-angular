import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ar-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.less']
})
export class ProductInfoComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    const products$ = this.productService.getProducts$();
    this.product$ = this.route.params.pipe(
      switchMap((parameter: Params) => {
        return this.productService.getProduct$(parameter.id);
      }));
  }
}
