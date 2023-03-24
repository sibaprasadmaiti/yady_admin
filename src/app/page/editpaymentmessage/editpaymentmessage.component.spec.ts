import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpaymentmessageComponent } from './editpaymentmessage.component';

describe('EditpaymentmessageComponent', () => {
  let component: EditpaymentmessageComponent;
  let fixture: ComponentFixture<EditpaymentmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpaymentmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpaymentmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
