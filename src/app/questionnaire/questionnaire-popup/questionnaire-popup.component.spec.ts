import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairePopupComponent } from './questionnaire-popup.component';

describe('QuestionnairePopupComponent', () => {
  let component: QuestionnairePopupComponent;
  let fixture: ComponentFixture<QuestionnairePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnairePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
