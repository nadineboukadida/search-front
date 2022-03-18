import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireFolderComponent } from './questionnaire-folder.component';

describe('QuestionnaireFolderComponent', () => {
  let component: QuestionnaireFolderComponent;
  let fixture: ComponentFixture<QuestionnaireFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
