import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequesterManagementComponent } from './service-requester-management.component';

describe('ServiceRequesterManagementComponent', () => {
  let component: ServiceRequesterManagementComponent;
  let fixture: ComponentFixture<ServiceRequesterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequesterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequesterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
