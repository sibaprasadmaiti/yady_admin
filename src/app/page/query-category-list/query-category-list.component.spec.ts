import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCategoryListComponent } from './query-category-list.component';

describe('QueryCategoryListComponent', () => {
  let component: QueryCategoryListComponent;
  let fixture: ComponentFixture<QueryCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
