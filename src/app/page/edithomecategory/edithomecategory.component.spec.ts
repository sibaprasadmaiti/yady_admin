import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithomecategoryComponent } from './edithomecategory.component';

describe('EdithomecategoryComponent', () => {
  let component: EdithomecategoryComponent;
  let fixture: ComponentFixture<EdithomecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithomecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithomecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
