import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingQuotationApprovalComponent } from './booking-quotation-approval.component';

describe('BookingQuotationApprovalComponent', () => {
  let component: BookingQuotationApprovalComponent;
  let fixture: ComponentFixture<BookingQuotationApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingQuotationApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingQuotationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
