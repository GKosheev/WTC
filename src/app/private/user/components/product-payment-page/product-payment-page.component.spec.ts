import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaymentPageComponent } from './product-payment-page.component';

describe('ProductPaymentPageComponent', () => {
  let component: ProductPaymentPageComponent;
  let fixture: ComponentFixture<ProductPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPaymentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
