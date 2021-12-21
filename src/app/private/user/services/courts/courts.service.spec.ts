import { TestBed } from '@angular/core/testing';

import { CourtsService } from './courts.service';

describe('CourtsService', () => {
  let service: CourtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
