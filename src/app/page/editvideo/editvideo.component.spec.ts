import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvideoComponent } from './editvideo.component';

describe('EditvideoComponent', () => {
  let component: EditvideoComponent;
  let fixture: ComponentFixture<EditvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
