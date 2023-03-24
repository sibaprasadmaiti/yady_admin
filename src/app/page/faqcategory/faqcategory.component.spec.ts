import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqcategoryComponent } from './faqcategory.component';

describe('FaqcategoryComponent', () => {
  let component: FaqcategoryComponent;
  let fixture: ComponentFixture<FaqcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
