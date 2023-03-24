import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeEditComponent } from './promo-code-edit.component';

describe('PromoCodeEditComponent', () => {
  let component: PromoCodeEditComponent;
  let fixture: ComponentFixture<PromoCodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoCodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
