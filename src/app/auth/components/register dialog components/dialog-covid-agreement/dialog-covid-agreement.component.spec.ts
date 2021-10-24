import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCovidAgreementComponent } from './dialog-covid-agreement.component';

describe('DialogCovidAgreementComponent', () => {
  let component: DialogCovidAgreementComponent;
  let fixture: ComponentFixture<DialogCovidAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCovidAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCovidAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
