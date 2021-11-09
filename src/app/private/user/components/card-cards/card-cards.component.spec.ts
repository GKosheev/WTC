import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCardsComponent } from './card-cards.component';

describe('CardCardsComponent', () => {
  let component: CardCardsComponent;
  let fixture: ComponentFixture<CardCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
