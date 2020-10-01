import { TestBed } from '@angular/core/testing';

import { Abc1Guard } from './abc1.guard';

describe('Abc1Guard', () => {
  let guard: Abc1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Abc1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
