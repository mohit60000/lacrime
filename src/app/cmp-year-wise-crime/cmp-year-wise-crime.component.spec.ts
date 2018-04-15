import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpYearWiseCrime } from './cmp-year-wise-crime.component';

describe('CmpYearWiseCrimeComponent', () => {
  let component: CmpYearWiseCrime;
  let fixture: ComponentFixture<CmpYearWiseCrime>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpYearWiseCrime ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpYearWiseCrime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
