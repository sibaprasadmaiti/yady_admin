import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCategoryAddComponent } from './query-category-add.component';

describe('QueryCategoryAddComponent', () => {
  let component: QueryCategoryAddComponent;
  let fixture: ComponentFixture<QueryCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
