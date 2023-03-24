import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCategoryEditComponent } from './zone-category-edit.component';

describe('ZoneCategoryEditComponent', () => {
  let component: ZoneCategoryEditComponent;
  let fixture: ComponentFixture<ZoneCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
