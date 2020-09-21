import { TestBed } from '@angular/core/testing';

import { HttpconfigInterceptor } from './httpconfig.interceptor';

describe('HttpconfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpconfigInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpconfigInterceptor = TestBed.inject(HttpconfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
