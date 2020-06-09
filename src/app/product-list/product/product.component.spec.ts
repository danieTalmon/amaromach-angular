import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { instance, mock } from 'ts-mockito';
import { mockProduct } from '../mock/product-list.mock';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let productComponent: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const mockActivatedRoute: ActivatedRoute = mock(ActivatedRoute);

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
    productComponent.product = mockProduct;
    expect(productComponent.isOutOfStuck()).toEqual(false);

    productComponent.product = { ...mockProduct, limit: 0 };
    expect(productComponent.isOutOfStuck()).toEqual(true);
  });
});
