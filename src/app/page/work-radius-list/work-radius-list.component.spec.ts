import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRadiusListComponent } from './work-radius-list.component';

describe('WorkRadiusListComponent', () => {
  let component: WorkRadiusListComponent;
  let fixture: ComponentFixture<WorkRadiusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkRadiusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRadiusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
