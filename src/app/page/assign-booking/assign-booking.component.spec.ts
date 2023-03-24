import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBookingComponent } from './assign-booking.component';

describe('AssignBookingComponent', () => {
  let component: AssignBookingComponent;
  let fixture: ComponentFixture<AssignBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
