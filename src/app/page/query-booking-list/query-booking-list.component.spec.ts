import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBookingListComponent } from './query-booking-list.component';

describe('QueryBookingListComponent', () => {
  let component: QueryBookingListComponent;
  let fixture: ComponentFixture<QueryBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
