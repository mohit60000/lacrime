import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpAreaNameDropdown } from './cmp-area-name-dropdown.component';

describe('CmpAreaNameDropdownComponent', () => {
  let component: CmpAreaNameDropdown;
  let fixture: ComponentFixture<CmpAreaNameDropdown>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpAreaNameDropdown ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpAreaNameDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
