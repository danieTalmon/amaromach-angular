import { CartState } from './../../cart/reducers/cart.reducer';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartComponent } from 'src/app/cart/cart.component';
import { getCartLength } from 'src/app/cart/reducers/cart.reducer';

@Component({
  selector: 'ar-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
  totalProducts$: Observable<number>;
  readonly imageUrl = 'assets/images/amaromach.png';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<CartState>
  ) {}

  ngOnInit() {
    this.totalProducts$ = this.store.select(getCartLength);
  }

  openCart() {
    const dialogRef: MatDialogRef<CartComponent> = this.dialog.open(
      CartComponent,
      {
        width: '55%',
        height: 'auto',
        maxHeight: 700,
      }
    );
  }
}
