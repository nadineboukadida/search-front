import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainTableComponent } from './search-main-table.component';

describe('SearchMainTableComponent', () => {
  let component: SearchMainTableComponent;
  let fixture: ComponentFixture<SearchMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMainTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
