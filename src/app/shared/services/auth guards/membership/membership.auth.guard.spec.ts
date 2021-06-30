import { TestBed } from '@angular/core/testing';

import { MembershipAuthGuard } from './membership.auth.guard';

describe('MemberAuthGuardGuard', () => {
  let guard: MembershipAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MembershipAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
