import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrgComponent } from './pending-org.component';

describe('PendingOrgComponent', () => {
  let component: PendingOrgComponent;
  let fixture: ComponentFixture<PendingOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingOrgComponent]
    });
    fixture = TestBed.createComponent(PendingOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
