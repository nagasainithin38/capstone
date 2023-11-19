import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AllVehiclesComponent } from './all-vehicles/all-vehicles.component';
import { CreateRideComponent } from './create-ride/create-ride.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';


@NgModule({
  declarations: [
    VendorComponent,
    AddVehicleComponent,
    AllVehiclesComponent,
    CreateRideComponent,
    BookDialogComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    
  ]
})
export class VendorModule { }
