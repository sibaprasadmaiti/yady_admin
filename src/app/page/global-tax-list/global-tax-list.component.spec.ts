import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTaxListComponent } from './global-tax-list.component';

describe('GlobalTaxListComponent', () => {
  let component: GlobalTaxListComponent;
  let fixture: ComponentFixture<GlobalTaxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTaxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTaxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
