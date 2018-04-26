import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpOptionsToViewDropdown } from './cmp-options-to-view.component';

describe('CmpOptionsToViewDropdown', () => {
  let component: CmpOptionsToViewDropdown;
  let fixture: ComponentFixture<CmpOptionsToViewDropdown>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpOptionsToViewDropdown ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpOptionsToViewDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
