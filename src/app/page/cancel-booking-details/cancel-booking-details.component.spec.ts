import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBookingDetailsComponent } from './cancel-booking-details.component';

describe('CancelBookingDetailsComponent', () => {
  let component: CancelBookingDetailsComponent;
  let fixture: ComponentFixture<CancelBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
