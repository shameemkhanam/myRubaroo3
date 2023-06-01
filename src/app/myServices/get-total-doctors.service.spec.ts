import { TestBed } from '@angular/core/testing';

import { GetTotalDoctorsService } from './get-total-doctors.service';

describe('GetTotalDoctorsService', () => {
  let service: GetTotalDoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTotalDoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
