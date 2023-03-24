import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveChangeRequestComponent } from './approve-change-request.component';

describe('ApproveChangeRequestComponent', () => {
  let component: ApproveChangeRequestComponent;
  let fixture: ComponentFixture<ApproveChangeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveChangeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
