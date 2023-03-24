import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfaqComponent } from './editfaq.component';

describe('EditfaqComponent', () => {
  let component: EditfaqComponent;
  let fixture: ComponentFixture<EditfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
