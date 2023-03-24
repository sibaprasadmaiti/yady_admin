import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpWorkingHoursComponent } from './sp-working-hours.component';

describe('SpWorkingHoursComponent', () => {
  let component: SpWorkingHoursComponent;
  let fixture: ComponentFixture<SpWorkingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpWorkingHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
