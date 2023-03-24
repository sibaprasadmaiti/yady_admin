import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayEditComponent } from './holiday-edit.component';

describe('HolidayEditComponent', () => {
  let component: HolidayEditComponent;
  let fixture: ComponentFixture<HolidayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
