import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsManagementComponent } from './cms-management.component';

describe('CmsManagementComponent', () => {
  let component: CmsManagementComponent;
  let fixture: ComponentFixture<CmsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
