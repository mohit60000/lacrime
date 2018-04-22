import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpYearDataDialog } from './cmp-year-data-dialog.component';

describe('CmpYearDataDialog', () => {
  let component: CmpYearDataDialog;
  let fixture: ComponentFixture<CmpYearDataDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpYearDataDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpYearDataDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
