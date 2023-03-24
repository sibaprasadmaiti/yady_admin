import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDispatcherEditComponent } from './service-dispatcher-edit.component';

describe('ServiceDispatcherEditComponent', () => {
  let component: ServiceDispatcherEditComponent;
  let fixture: ComponentFixture<ServiceDispatcherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDispatcherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDispatcherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
