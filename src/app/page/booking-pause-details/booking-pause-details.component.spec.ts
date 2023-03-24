import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPauseDetailsComponent } from './booking-pause-details.component';

describe('BookingPauseDetailsComponent', () => {
  let component: BookingPauseDetailsComponent;
  let fixture: ComponentFixture<BookingPauseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPauseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPauseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
