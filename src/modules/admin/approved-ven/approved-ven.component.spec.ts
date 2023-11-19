import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedVenComponent } from './approved-ven.component';

describe('ApprovedVenComponent', () => {
  let component: ApprovedVenComponent;
  let fixture: ComponentFixture<ApprovedVenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedVenComponent]
    });
    fixture = TestBed.createComponent(ApprovedVenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
