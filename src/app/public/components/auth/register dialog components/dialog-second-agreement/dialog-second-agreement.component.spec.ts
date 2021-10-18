import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSecondAgreementComponent } from './dialog-second-agreement.component';

describe('DialogSecondAgreementComponent', () => {
  let component: DialogSecondAgreementComponent;
  let fixture: ComponentFixture<DialogSecondAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSecondAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSecondAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
