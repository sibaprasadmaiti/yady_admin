import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderRadiusComponent } from './service-provider-radius.component';

describe('ServiceProviderRadiusComponent', () => {
  let component: ServiceProviderRadiusComponent;
  let fixture: ComponentFixture<ServiceProviderRadiusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderRadiusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderRadiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
