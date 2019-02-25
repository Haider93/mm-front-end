import { TestBed } from '@angular/core/testing';

import { MmServiceService } from './mm-service.service';

describe('MmServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MmServiceService = TestBed.get(MmServiceService);
    expect(service).toBeTruthy();
  });
});
