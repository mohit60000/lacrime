import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpDayOfWeekGraph } from './cmp-day-of-week-graph.component';

describe('CmpDayOfWeekGraphComponent', () => {
  let component: CmpDayOfWeekGraph;
  let fixture: ComponentFixture<CmpDayOfWeekGraph>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpDayOfWeekGraph ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpDayOfWeekGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
