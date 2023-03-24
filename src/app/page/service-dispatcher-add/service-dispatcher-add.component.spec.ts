import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDispatcherAddComponent } from './service-dispatcher-add.component';

describe('ServiceDispatcherAddComponent', () => {
  let component: ServiceDispatcherAddComponent;
  let fixture: ComponentFixture<ServiceDispatcherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDispatcherAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDispatcherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
