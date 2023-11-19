import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingRidesComponent } from './upcoming-rides.component';

describe('UpcomingRidesComponent', () => {
  let component: UpcomingRidesComponent;
  let fixture: ComponentFixture<UpcomingRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingRidesComponent]
    });
    fixture = TestBed.createComponent(UpcomingRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
