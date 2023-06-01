import { TestBed } from '@angular/core/testing';

import { SurveysCountService } from './surveys-count.service';

describe('SurveysCountService', () => {
  let service: SurveysCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveysCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
