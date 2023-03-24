import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAddressGoogleMapComponent } from './booking-address-google-map.component';

describe('BookingAddressGoogleMapComponent', () => {
  let component: BookingAddressGoogleMapComponent;
  let fixture: ComponentFixture<BookingAddressGoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingAddressGoogleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAddressGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
