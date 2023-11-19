import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { ToHomeRideComponent } from './to-home-ride/to-home-ride.component';
import { PnfComponent } from 'src/app/pnf/pnf.component';
import { CompletedRidesComponent } from './completed-rides/completed-rides.component';

const routes: Routes = [
  { path: 'home', component: EmployeeComponent },
  {path:"toHome",component:ToHomeRideComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"completedBookings",component:CompletedRidesComponent},
  {path:"**",component:PnfComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
