import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplansubscriptionComponent } from './addplansubscription.component';

describe('AddplansubscriptionComponent', () => {
  let component: AddplansubscriptionComponent;
  let fixture: ComponentFixture<AddplansubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplansubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplansubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
