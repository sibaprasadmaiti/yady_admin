import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfaqcategoryComponent } from './addfaqcategory.component';

describe('AddfaqcategoryComponent', () => {
  let component: AddfaqcategoryComponent;
  let fixture: ComponentFixture<AddfaqcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfaqcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfaqcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
