import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterboxComponent } from './search-filterbox.component';

describe('SearchFilterboxComponent', () => {
  let component: SearchFilterboxComponent;
  let fixture: ComponentFixture<SearchFilterboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFilterboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
