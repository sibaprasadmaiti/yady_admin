import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTaxEditComponent } from './global-tax-edit.component';

describe('GlobalTaxEditComponent', () => {
  let component: GlobalTaxEditComponent;
  let fixture: ComponentFixture<GlobalTaxEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTaxEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTaxEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
