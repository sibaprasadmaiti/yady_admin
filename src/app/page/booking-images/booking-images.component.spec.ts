import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingImagesComponent } from './booking-images.component';

describe('BookingImagesComponent', () => {
  let component: BookingImagesComponent;
  let fixture: ComponentFixture<BookingImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
