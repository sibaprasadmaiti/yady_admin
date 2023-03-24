import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsEditComponent } from './add-ons-edit.component';

describe('AddOnsEditComponent', () => {
  let component: AddOnsEditComponent;
  let fixture: ComponentFixture<AddOnsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
