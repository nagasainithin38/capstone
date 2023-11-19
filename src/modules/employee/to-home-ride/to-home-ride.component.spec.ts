import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToHomeRideComponent } from './to-home-ride.component';

describe('ToHomeRideComponent', () => {
  let component: ToHomeRideComponent;
  let fixture: ComponentFixture<ToHomeRideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToHomeRideComponent]
    });
    fixture = TestBed.createComponent(ToHomeRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
