import { Product } from './../../shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mock, instance } from 'ts-mockito';

describe('ProductComponent', () => {
  const product1: Product = {
    name: 'test1',
    description: 'test1 description',
    price: 40,
    limit: 5,
  };
  const product2: Product = {
    name: 'test2',
    description: 'test2 description',
    price: 50,
    limit: 0,
  };

  let productComponent: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockActivatedRoute = mock(ActivatedRoute);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: instance(mockActivatedRoute) },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    productComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productComponent).toBeTruthy();
  });
  it('should emit remove event', () => {
    spyOn(productComponent.remove, 'emit');
    productComponent.removeFromCart();
    expect(productComponent.remove.emit).toHaveBeenCalled();
  });
  it('should emit add event', () => {
    spyOn(productComponent.add, 'emit');
    productComponent.addToCart();
    expect(productComponent.add.emit).toHaveBeenCalled();
  });
  it('should return is out of stock', () => {
    productComponent.product = product1;
    expect(productComponent.isOutOfStuck()).toEqual(false);

    productComponent.product = product2;
    expect(productComponent.isOutOfStuck()).toEqual(true);
  });
});
