import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PendingOrgComponent } from './pending-org/pending-org.component';
import { PendingVenComponent } from './pending-ven/pending-ven.component';
import { MapOrgVenComponent } from './map-org-ven/map-org-ven.component';
import { ApprovedOrgComponent } from './approved-org/approved-org.component';
import { ApprovedVenComponent } from './approved-ven/approved-ven.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { UnassignComponent } from './unassign/unassign.component'

@NgModule({
  declarations: [
    AdminComponent,
    PendingOrgComponent,
    PendingVenComponent,
    MapOrgVenComponent,
    ApprovedOrgComponent,
    ApprovedVenComponent,
    UnassignComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    DragDropModule
  ]
})
export class AdminModule { }
