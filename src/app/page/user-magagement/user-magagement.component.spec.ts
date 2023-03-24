import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMagagementComponent } from './user-magagement.component';

describe('UserMagagementComponent', () => {
  let component: UserMagagementComponent;
  let fixture: ComponentFixture<UserMagagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMagagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMagagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
