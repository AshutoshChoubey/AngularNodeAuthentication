import { TestBed } from '@angular/core/testing';

import { AbcGuard } from './abc.guard';

describe('AbcGuard', () => {
  let guard: AbcGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AbcGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
