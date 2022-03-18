import { TestBed } from '@angular/core/testing';

import { SearchFilterHelperService } from './search-filter-helper.service';

describe('SearchFilterHelperService', () => {
  let service: SearchFilterHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFilterHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
