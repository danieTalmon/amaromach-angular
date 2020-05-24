import { Observable } from 'rxjs';
import { CartService } from './../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartComponent } from 'src/app/cart/cart.component';

@Component({
  selector: 'ar-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  totalProducts$: Observable<number >;
  readonly imageUrl = 'assets/images/amaromach.png';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit() {
    this.totalProducts$ = this.cartService.totalProducts();
  }

  openCart() {
    const dialogRef: MatDialogRef<CartComponent> = this.dialog.open(CartComponent, {
      width: '55%',
      height: 'auto',
      maxHeight: 700
    });
  }
}
