import { TestBed } from '@angular/core/testing';

import { ModalmanagerService } from './modalmanager.service';

describe('ModalmanagerService', () => {
  let service: ModalmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
