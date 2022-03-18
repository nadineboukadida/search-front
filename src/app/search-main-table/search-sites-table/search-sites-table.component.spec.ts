import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSitesTableComponent } from './search-sites-table.component';

describe('SearchSitesTableComponent', () => {
  let component: SearchSitesTableComponent;
  let fixture: ComponentFixture<SearchSitesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSitesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSitesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
