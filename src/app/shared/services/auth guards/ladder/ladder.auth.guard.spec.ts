import { TestBed } from '@angular/core/testing';

import { LadderAuthGuard } from './ladder.auth.guard';

describe('LadderAuthGuardGuard', () => {
  let guard: LadderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LadderAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
