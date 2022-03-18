import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireDropdownComponent } from './questionnaire-dropdown.component';

describe('QuestionnaireDropdownComponent', () => {
  let component: QuestionnaireDropdownComponent;
  let fixture: ComponentFixture<QuestionnaireDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
