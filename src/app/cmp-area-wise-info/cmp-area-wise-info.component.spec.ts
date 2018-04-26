import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpAreaWiseInfo } from './cmp-area-wise-info.component';

describe('CmpAreaWiseInfo', () => {
  let component: CmpAreaWiseInfo;
  let fixture: ComponentFixture<CmpAreaWiseInfo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpAreaWiseInfo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpAreaWiseInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
