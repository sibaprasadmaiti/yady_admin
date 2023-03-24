import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplansubscriptionComponent } from './editplansubscription.component';

describe('EditplansubscriptionComponent', () => {
  let component: EditplansubscriptionComponent;
  let fixture: ComponentFixture<EditplansubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditplansubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditplansubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
