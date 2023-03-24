import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTrackingComponent } from './start-tracking.component';

describe('StartTrackingComponent', () => {
  let component: StartTrackingComponent;
  let fixture: ComponentFixture<StartTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
