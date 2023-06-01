import { TestBed } from '@angular/core/testing';

import { AllQuestionsService } from './all-questions.service';

describe('AllQuestionsService', () => {
  let service: AllQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
