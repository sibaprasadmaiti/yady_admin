import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryServiceAssignDetailsComponent } from './query-service-assign-details.component';

describe('QueryServiceAssignDetailsComponent', () => {
  let component: QueryServiceAssignDetailsComponent;
  let fixture: ComponentFixture<QueryServiceAssignDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryServiceAssignDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryServiceAssignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
