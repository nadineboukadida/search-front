import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriumCreateComponent } from './criterium-create.component';

describe('CriteriumCreateComponent', () => {
  let component: CriteriumCreateComponent;
  let fixture: ComponentFixture<CriteriumCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriumCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
