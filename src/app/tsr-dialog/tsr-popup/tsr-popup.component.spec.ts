import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsrPopupComponent } from './tsr-popup.component';

describe('TsrPopupComponent', () => {
  let component: TsrPopupComponent;
  let fixture: ComponentFixture<TsrPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsrPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsrPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
