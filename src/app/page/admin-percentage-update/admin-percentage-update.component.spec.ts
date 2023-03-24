import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPercentageUpdateComponent } from './admin-percentage-update.component';

describe('AdminPercentageUpdateComponent', () => {
  let component: AdminPercentageUpdateComponent;
  let fixture: ComponentFixture<AdminPercentageUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPercentageUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPercentageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
