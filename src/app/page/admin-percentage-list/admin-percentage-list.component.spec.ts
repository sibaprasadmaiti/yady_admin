import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPercentageListComponent } from './admin-percentage-list.component';

describe('AdminPercentageListComponent', () => {
  let component: AdminPercentageListComponent;
  let fixture: ComponentFixture<AdminPercentageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPercentageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPercentageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
