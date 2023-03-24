import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpWiseReportComponent } from './sp-wise-report.component';

describe('SpWiseReportComponent', () => {
  let component: SpWiseReportComponent;
  let fixture: ComponentFixture<SpWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
