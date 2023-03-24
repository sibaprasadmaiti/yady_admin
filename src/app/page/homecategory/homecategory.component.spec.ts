import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecategoryComponent } from './homecategory.component';

describe('HomecategoryComponent', () => {
  let component: HomecategoryComponent;
  let fixture: ComponentFixture<HomecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
