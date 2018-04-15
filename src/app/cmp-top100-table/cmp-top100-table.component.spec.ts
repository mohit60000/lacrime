import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpTop100Table } from './cmp-top100-table.component';

describe('CmpTop100TableComponent', () => {
  let component: CmpTop100Table;
  let fixture: ComponentFixture<CmpTop100Table>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpTop100Table ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpTop100Table);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
