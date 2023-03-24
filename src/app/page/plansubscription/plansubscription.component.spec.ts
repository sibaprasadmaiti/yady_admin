import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansubscriptionComponent } from './plansubscription.component';

describe('PlansubscriptionComponent', () => {
  let component: PlansubscriptionComponent;
  let fixture: ComponentFixture<PlansubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
