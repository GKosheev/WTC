import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisLadderComponent } from './tennis-ladder.component';

describe('TennisLadderComponent', () => {
  let component: TennisLadderComponent;
  let fixture: ComponentFixture<TennisLadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisLadderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
