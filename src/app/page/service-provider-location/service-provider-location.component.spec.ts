import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderLocationComponent } from './service-provider-location.component';

describe('ServiceProviderLocationComponent', () => {
  let component: ServiceProviderLocationComponent;
  let fixture: ComponentFixture<ServiceProviderLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
