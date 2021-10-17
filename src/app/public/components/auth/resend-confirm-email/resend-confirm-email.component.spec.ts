import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendConfirmEmailComponent } from './resend-confirm-email.component';

describe('ResendConfirmEmailComponent', () => {
  let component: ResendConfirmEmailComponent;
  let fixture: ComponentFixture<ResendConfirmEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendConfirmEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
