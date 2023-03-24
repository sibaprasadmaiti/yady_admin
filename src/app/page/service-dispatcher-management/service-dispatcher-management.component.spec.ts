import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDispatcherManagementComponent } from './service-dispatcher-management.component';

describe('ServiceDispatcherManagementComponent', () => {
  let component: ServiceDispatcherManagementComponent;
  let fixture: ComponentFixture<ServiceDispatcherManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDispatcherManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDispatcherManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
