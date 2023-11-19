import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { PnfComponent } from 'src/app/pnf/pnf.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AllVehiclesComponent } from './all-vehicles/all-vehicles.component';
import { CreateRideComponent } from './create-ride/create-ride.component';

const routes: Routes = [
  
  { path: "home", component: VendorComponent },
  {path:"add",component:AddVehicleComponent},
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"createRide",component:CreateRideComponent},
  {path:"vehicles",component:AllVehiclesComponent},
  {path:"**",component:PnfComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
