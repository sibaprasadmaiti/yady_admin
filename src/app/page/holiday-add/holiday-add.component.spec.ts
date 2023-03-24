import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayAddComponent } from './holiday-add.component';

describe('HolidayAddComponent', () => {
  let component: HolidayAddComponent;
  let fixture: ComponentFixture<HolidayAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
