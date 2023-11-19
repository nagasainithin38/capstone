import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PendingVenComponent } from './pending-ven/pending-ven.component';
import { PendingOrgComponent } from './pending-org/pending-org.component';
import { ApprovedVenComponent } from './approved-ven/approved-ven.component';
import { ApprovedOrgComponent } from './approved-org/approved-org.component';
import { MapOrgVenComponent } from './map-org-ven/map-org-ven.component';
import { PnfComponent } from 'src/app/pnf/pnf.component';
import { UnassignComponent } from './unassign/unassign.component';

const routes: Routes = [
  
  { path: 'home', component: AdminComponent },
  {path:"",redirectTo:"map",pathMatch:"full"},
  {path:"pending/vendors",component:PendingVenComponent},
  {path:"pending/org",component:PendingOrgComponent},
  {path:"approved/vendors",component:ApprovedVenComponent},
  {path:"approved/org",component:ApprovedOrgComponent},
  {path:"assigned",component:UnassignComponent},
  {path:"map",component:MapOrgVenComponent},
  {path:"**",component:PnfComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
