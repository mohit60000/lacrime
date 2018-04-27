import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveYearExtrapolationComponent } from './five-year-extrapolation.component';

describe('FiveYearExtrapolationComponent', () => {
  let component: FiveYearExtrapolationComponent;
  let fixture: ComponentFixture<FiveYearExtrapolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveYearExtrapolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveYearExtrapolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
