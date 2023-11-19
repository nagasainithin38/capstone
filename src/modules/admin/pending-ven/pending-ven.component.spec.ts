import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingVenComponent } from './pending-ven.component';

describe('PendingVenComponent', () => {
  let component: PendingVenComponent;
  let fixture: ComponentFixture<PendingVenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingVenComponent]
    });
    fixture = TestBed.createComponent(PendingVenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
