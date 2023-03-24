import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrWiseReportComponent } from './sr-wise-report.component';

describe('SrWiseReportComponent', () => {
  let component: SrWiseReportComponent;
  let fixture: ComponentFixture<SrWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
