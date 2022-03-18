import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSaveCheckboxComponent } from './local-save-checkbox.component';

describe('LocalSaveCheckboxComponent', () => {
  let component: LocalSaveCheckboxComponent;
  let fixture: ComponentFixture<LocalSaveCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalSaveCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSaveCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
