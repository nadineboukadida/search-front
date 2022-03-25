import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreetextSearchBoxComponent } from './freetext-search-box.component';

describe('FreetextSearchBoxComponent', () => {
  let component: FreetextSearchBoxComponent;
  let fixture: ComponentFixture<FreetextSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreetextSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreetextSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
