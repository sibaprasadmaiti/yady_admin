import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCategoryPriceViewComponent } from './zone-category-price-view.component';

describe('ZoneCategoryPriceViewComponent', () => {
  let component: ZoneCategoryPriceViewComponent;
  let fixture: ComponentFixture<ZoneCategoryPriceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneCategoryPriceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneCategoryPriceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
