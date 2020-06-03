import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartComponent } from 'src/app/cart/cart.component';
import { selectCartLength } from 'src/app/cart/reducers/cart.reducer';
import { AppState } from './../models/store.model';

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
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.totalProducts$ = this.store.select(selectCartLength);
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
