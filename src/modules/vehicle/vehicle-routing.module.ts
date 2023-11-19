import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { UpcomingRidesComponent } from './upcoming-rides/upcoming-rides.component';
import { PnfComponent } from 'src/app/pnf/pnf.component';
import { CurrRideComponent } from './curr-ride/curr-ride.component';
import { CompletedRidesComponent } from './completed-rides/completed-rides.component';



const routes: Routes = [
  { path: 'home', component: VehicleComponent },
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:'completedrides',component:CompletedRidesComponent},
  {path:"upcoming",component:UpcomingRidesComponent},
  {path:"currRide",component:CurrRideComponent},
  {path:"**",component:PnfComponent}
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
