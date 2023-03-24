import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignQueryServiceComponent } from './assign-query-service.component';

describe('AssignQueryServiceComponent', () => {
  let component: AssignQueryServiceComponent;
  let fixture: ComponentFixture<AssignQueryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignQueryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignQueryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
