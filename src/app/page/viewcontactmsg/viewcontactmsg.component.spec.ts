import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcontactmsgComponent } from './viewcontactmsg.component';

describe('ViewcontactmsgComponent', () => {
  let component: ViewcontactmsgComponent;
  let fixture: ComponentFixture<ViewcontactmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontactmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcontactmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
