import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRadiusEditComponent } from './work-radius-edit.component';

describe('WorkRadiusEditComponent', () => {
  let component: WorkRadiusEditComponent;
  let fixture: ComponentFixture<WorkRadiusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkRadiusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRadiusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
