import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrSpTransactionListComponent } from './sr-sp-transaction-list.component';

describe('SrSpTransactionListComponent', () => {
  let component: SrSpTransactionListComponent;
  let fixture: ComponentFixture<SrSpTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrSpTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrSpTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
