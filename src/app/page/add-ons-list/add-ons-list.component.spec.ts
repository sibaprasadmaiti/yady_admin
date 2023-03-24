import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsListComponent } from './add-ons-list.component';

describe('AddOnsListComponent', () => {
  let component: AddOnsListComponent;
  let fixture: ComponentFixture<AddOnsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
