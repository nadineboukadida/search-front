import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFeedbackDialogComponent } from './search-feedback-dialog.component';

describe('SearchFeedbackDialogComponent', () => {
  let component: SearchFeedbackDialogComponent;
  let fixture: ComponentFixture<SearchFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFeedbackDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
