import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrRescheduleRuleComponent } from './sr-reschedule-rule.component';

describe('SrRescheduleRuleComponent', () => {
  let component: SrRescheduleRuleComponent;
  let fixture: ComponentFixture<SrRescheduleRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrRescheduleRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrRescheduleRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
