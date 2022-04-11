import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUserTypeComponent } from './pick-user-type.component';

describe('PickUserTypeComponent', () => {
  let component: PickUserTypeComponent;
  let fixture: ComponentFixture<PickUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickUserTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
