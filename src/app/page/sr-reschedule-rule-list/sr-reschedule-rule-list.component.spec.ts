import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrRescheduleRuleListComponent } from './sr-reschedule-rule-list.component';

describe('SrRescheduleRuleListComponent', () => {
  let component: SrRescheduleRuleListComponent;
  let fixture: ComponentFixture<SrRescheduleRuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrRescheduleRuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrRescheduleRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
