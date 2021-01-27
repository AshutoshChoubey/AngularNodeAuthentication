import { TestBed } from '@angular/core/testing';

import { BeforeloginGuard } from './beforelogin.guard';

describe('BeforeloginGuard', () => {
  let guard: BeforeloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BeforeloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
