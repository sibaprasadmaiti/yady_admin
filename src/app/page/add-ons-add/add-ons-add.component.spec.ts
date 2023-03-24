import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsAddComponent } from './add-ons-add.component';

describe('AddOnsAddComponent', () => {
  let component: AddOnsAddComponent;
  let fixture: ComponentFixture<AddOnsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
