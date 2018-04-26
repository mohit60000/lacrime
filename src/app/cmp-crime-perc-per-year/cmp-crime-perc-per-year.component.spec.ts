import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpCrimePercPerYear } from './cmp-crime-perc-per-year.component';

describe('CmpCrimePercPerYear', () => {
  let component: CmpCrimePercPerYear;
  let fixture: ComponentFixture<CmpCrimePercPerYear>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpCrimePercPerYear ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpCrimePercPerYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
