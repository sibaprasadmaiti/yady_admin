import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPercentageComponent } from './sp-percentage.component';

describe('SpPercentageComponent', () => {
  let component: SpPercentageComponent;
  let fixture: ComponentFixture<SpPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
