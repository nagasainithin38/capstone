import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { PnfComponent } from 'src/app/pnf/pnf.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

const routes: Routes = [
  
  { path: "home", component: VendorComponent },
  {path:"add",component:AddVehicleComponent},
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"**",component:PnfComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
