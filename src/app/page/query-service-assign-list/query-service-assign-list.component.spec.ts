import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryServiceAssignListComponent } from './query-service-assign-list.component';

describe('QueryServiceAssignListComponent', () => {
  let component: QueryServiceAssignListComponent;
  let fixture: ComponentFixture<QueryServiceAssignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryServiceAssignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryServiceAssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
