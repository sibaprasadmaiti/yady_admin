import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcmsComponent } from './addcms.component';

describe('AddcmsComponent', () => {
  let component: AddcmsComponent;
  let fixture: ComponentFixture<AddcmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
