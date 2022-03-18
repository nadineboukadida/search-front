import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriumDetailsComponent } from './criterium-details.component';

describe('CriteriumDetailsComponent', () => {
  let component: CriteriumDetailsComponent;
  let fixture: ComponentFixture<CriteriumDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriumDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
