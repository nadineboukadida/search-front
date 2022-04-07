import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemRulesComponent } from './poem-rules.component';

describe('PoemRulesComponent', () => {
  let component: PoemRulesComponent;
  let fixture: ComponentFixture<PoemRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoemRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
