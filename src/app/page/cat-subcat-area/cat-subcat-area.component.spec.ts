import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSubcatAreaComponent } from './cat-subcat-area.component';

describe('CatSubcatAreaComponent', () => {
  let component: CatSubcatAreaComponent;
  let fixture: ComponentFixture<CatSubcatAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSubcatAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSubcatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
