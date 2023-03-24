import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryPriceListComponent } from './sub-category-price-list.component';

describe('SubCategoryPriceListComponent', () => {
  let component: SubCategoryPriceListComponent;
  let fixture: ComponentFixture<SubCategoryPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
