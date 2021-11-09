import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardsListComponent } from './dialog-cards-list.component';

describe('DialogCardsListComponent', () => {
  let component: DialogCardsListComponent;
  let fixture: ComponentFixture<DialogCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCardsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
