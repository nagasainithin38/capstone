import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOrgVenComponent } from './map-org-ven.component';

describe('MapOrgVenComponent', () => {
  let component: MapOrgVenComponent;
  let fixture: ComponentFixture<MapOrgVenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapOrgVenComponent]
    });
    fixture = TestBed.createComponent(MapOrgVenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
