import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfaqcategoryComponent } from './editfaqcategory.component';

describe('EditfaqcategoryComponent', () => {
  let component: EditfaqcategoryComponent;
  let fixture: ComponentFixture<EditfaqcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfaqcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfaqcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
