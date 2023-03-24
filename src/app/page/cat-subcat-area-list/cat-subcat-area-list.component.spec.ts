import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSubcatAreaListComponent } from './cat-subcat-area-list.component';

describe('CatSubcatAreaListComponent', () => {
  let component: CatSubcatAreaListComponent;
  let fixture: ComponentFixture<CatSubcatAreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSubcatAreaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSubcatAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
