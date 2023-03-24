import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTaxComponent } from './global-tax.component';

describe('GlobalTaxComponent', () => {
  let component: GlobalTaxComponent;
  let fixture: ComponentFixture<GlobalTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
