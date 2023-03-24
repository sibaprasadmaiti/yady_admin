import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSubcatAreaPlacesComponent } from './cat-subcat-area-places.component';

describe('CatSubcatAreaPlacesComponent', () => {
  let component: CatSubcatAreaPlacesComponent;
  let fixture: ComponentFixture<CatSubcatAreaPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSubcatAreaPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSubcatAreaPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
