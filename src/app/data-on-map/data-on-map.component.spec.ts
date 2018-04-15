import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOnMapComponent } from './data-on-map.component';

describe('DataOnMapComponent', () => {
  let component: DataOnMapComponent;
  let fixture: ComponentFixture<DataOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOnMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
