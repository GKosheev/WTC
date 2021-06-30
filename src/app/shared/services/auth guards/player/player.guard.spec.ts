import { TestBed } from '@angular/core/testing';

import { PlayerAuthGuard } from './player.auth.guard';

describe('PlayerGuard', () => {
  let guard: PlayerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlayerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
