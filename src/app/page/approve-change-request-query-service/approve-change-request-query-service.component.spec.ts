import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveChangeRequestQueryServiceComponent } from './approve-change-request-query-service.component';

describe('ApproveChangeRequestQueryServiceComponent', () => {
  let component: ApproveChangeRequestQueryServiceComponent;
  let fixture: ComponentFixture<ApproveChangeRequestQueryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveChangeRequestQueryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveChangeRequestQueryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
