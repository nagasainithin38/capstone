import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrRideComponent } from './curr-ride.component';

describe('CurrRideComponent', () => {
  let component: CurrRideComponent;
  let fixture: ComponentFixture<CurrRideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrRideComponent]
    });
    fixture = TestBed.createComponent(CurrRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
