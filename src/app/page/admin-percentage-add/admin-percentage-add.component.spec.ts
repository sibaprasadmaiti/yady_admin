import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPercentageAddComponent } from './admin-percentage-add.component';

describe('AdminPercentageAddComponent', () => {
  let component: AdminPercentageAddComponent;
  let fixture: ComponentFixture<AdminPercentageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPercentageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPercentageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
