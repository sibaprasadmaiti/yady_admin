import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemailtemplateComponent } from './editemailtemplate.component';

describe('EditemailtemplateComponent', () => {
  let component: EditemailtemplateComponent;
  let fixture: ComponentFixture<EditemailtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditemailtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditemailtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
