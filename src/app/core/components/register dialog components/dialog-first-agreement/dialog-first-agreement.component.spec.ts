import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFirstAgreementComponent } from './dialog-first-agreement.component';

describe('DialogFirstAgreementComponent', () => {
  let component: DialogFirstAgreementComponent;
  let fixture: ComponentFixture<DialogFirstAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFirstAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFirstAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
