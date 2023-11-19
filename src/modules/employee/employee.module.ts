import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ToHomeRideComponent } from './to-home-ride/to-home-ride.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MapsComponent } from './maps/maps.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CompletedRidesComponent } from './completed-rides/completed-rides.component';
@NgModule({
  declarations: [
    EmployeeComponent,
    ToHomeRideComponent,
    MapsComponent,
    CompletedRidesComponent,
   
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LeafletModule
  ]
})
export class EmployeeModule { }
