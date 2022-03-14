import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPurchaseComponent } from './test-purchase.component';

describe('TestPurchaseComponent', () => {
  let component: TestPurchaseComponent;
  let fixture: ComponentFixture<TestPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
