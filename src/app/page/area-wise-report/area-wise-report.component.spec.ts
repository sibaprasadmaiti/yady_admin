import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaWiseReportComponent } from './area-wise-report.component';

describe('AreaWiseReportComponent', () => {
  let component: AreaWiseReportComponent;
  let fixture: ComponentFixture<AreaWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
