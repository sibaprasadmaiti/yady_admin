import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTransactionListComponent } from './sp-transaction-list.component';

describe('SpTransactionListComponent', () => {
  let component: SpTransactionListComponent;
  let fixture: ComponentFixture<SpTransactionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpTransactionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
