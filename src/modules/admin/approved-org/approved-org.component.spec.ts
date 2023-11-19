import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedOrgComponent } from './approved-org.component';

describe('ApprovedOrgComponent', () => {
  let component: ApprovedOrgComponent;
  let fixture: ComponentFixture<ApprovedOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedOrgComponent]
    });
    fixture = TestBed.createComponent(ApprovedOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
