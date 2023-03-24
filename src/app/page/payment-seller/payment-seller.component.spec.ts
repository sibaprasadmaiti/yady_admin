import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSellerComponent } from './payment-seller.component';

describe('PaymentSellerComponent', () => {
  let component: PaymentSellerComponent;
  let fixture: ComponentFixture<PaymentSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
