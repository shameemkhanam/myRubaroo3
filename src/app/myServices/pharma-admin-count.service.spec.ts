import { TestBed } from '@angular/core/testing';

import { PharmaAdminCountService } from './pharma-admin-count.service';

describe('PharmaAdminCountService', () => {
  let service: PharmaAdminCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmaAdminCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
