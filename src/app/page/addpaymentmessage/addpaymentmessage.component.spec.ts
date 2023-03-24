import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentmessageComponent } from './addpaymentmessage.component';

describe('AddpaymentmessageComponent', () => {
  let component: AddpaymentmessageComponent;
  let fixture: ComponentFixture<AddpaymentmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpaymentmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpaymentmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
