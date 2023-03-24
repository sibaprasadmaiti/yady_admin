import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCatPlacesComponent } from './query-cat-places.component';

describe('QueryCatPlacesComponent', () => {
  let component: QueryCatPlacesComponent;
  let fixture: ComponentFixture<QueryCatPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCatPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCatPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
