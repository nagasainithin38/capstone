import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import { UpcomingRidesComponent } from './upcoming-rides/upcoming-rides.component';
import { CurrRideComponent } from './curr-ride/curr-ride.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompletedRidesComponent } from './completed-rides/completed-rides.component';


@NgModule({
  declarations: [
    VehicleComponent,
    UpcomingRidesComponent,
    CurrRideComponent,
    CompletedRidesComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehicleModule { }
