import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpCalculateProbabilityComponent } from './cmp-calculate-probability.component';

describe('CmpCalculateProbabilityComponent', () => {
  let component: CmpCalculateProbabilityComponent;
  let fixture: ComponentFixture<CmpCalculateProbabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpCalculateProbabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpCalculateProbabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
