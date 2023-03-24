import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCategoryComponent } from './zone-category.component';

describe('ZoneCategoryComponent', () => {
  let component: ZoneCategoryComponent;
  let fixture: ComponentFixture<ZoneCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
