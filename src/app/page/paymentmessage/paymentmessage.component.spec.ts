import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmessageComponent } from './paymentmessage.component';

describe('PaymentmessageComponent', () => {
  let component: PaymentmessageComponent;
  let fixture: ComponentFixture<PaymentmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
