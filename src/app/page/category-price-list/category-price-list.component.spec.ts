import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPriceListComponent } from './category-price-list.component';

describe('CategoryPriceListComponent', () => {
  let component: CategoryPriceListComponent;
  let fixture: ComponentFixture<CategoryPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
