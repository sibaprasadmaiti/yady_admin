import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCategoryPriceListComponent } from './zone-category-price-list.component';

describe('ZoneCategoryPriceListComponent', () => {
  let component: ZoneCategoryPriceListComponent;
  let fixture: ComponentFixture<ZoneCategoryPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneCategoryPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneCategoryPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
