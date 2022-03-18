import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMobileCardComponent } from './search-mobile-card.component';

describe('SearchMobileCardComponent', () => {
  let component: SearchMobileCardComponent;
  let fixture: ComponentFixture<SearchMobileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMobileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMobileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
