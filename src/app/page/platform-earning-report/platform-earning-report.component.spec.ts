import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformEarningReportComponent } from './platform-earning-report.component';

describe('PlatformEarningReportComponent', () => {
  let component: PlatformEarningReportComponent;
  let fixture: ComponentFixture<PlatformEarningReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformEarningReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformEarningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
