import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpWorkingAreaComponent } from './sp-working-area.component';

describe('SpWorkingAreaComponent', () => {
  let component: SpWorkingAreaComponent;
  let fixture: ComponentFixture<SpWorkingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpWorkingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpWorkingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
