import { TestBed } from '@angular/core/testing';

import { SaveAuditService } from './save-audit.service';

describe('SaveAuditService', () => {
  let service: SaveAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
