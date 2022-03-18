import { TestBed } from '@angular/core/testing';

import { CriteriumService } from './criterium.service';

describe('CriteriumService', () => {
  let service: CriteriumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
