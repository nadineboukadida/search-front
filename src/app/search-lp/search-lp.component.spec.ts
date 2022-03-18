import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLpComponent } from './search-lp.component';

describe('SearchLpComponent', () => {
  let component: SearchLpComponent;
  let fixture: ComponentFixture<SearchLpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
