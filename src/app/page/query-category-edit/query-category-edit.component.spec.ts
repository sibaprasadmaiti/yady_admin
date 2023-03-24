import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCategoryEditComponent } from './query-category-edit.component';

describe('QueryCategoryEditComponent', () => {
  let component: QueryCategoryEditComponent;
  let fixture: ComponentFixture<QueryCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
