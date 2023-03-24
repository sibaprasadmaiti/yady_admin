import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonePlacesComponent } from './zone-places.component';

describe('ZonePlacesComponent', () => {
  let component: ZonePlacesComponent;
  let fixture: ComponentFixture<ZonePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
