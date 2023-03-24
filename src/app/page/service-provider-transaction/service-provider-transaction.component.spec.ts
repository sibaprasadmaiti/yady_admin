import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderTransactionComponent } from './service-provider-transaction.component';

describe('ServiceProviderTransactionComponent', () => {
  let component: ServiceProviderTransactionComponent;
  let fixture: ComponentFixture<ServiceProviderTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
