import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnverifiedComponent } from './unverified/unverified.component';
import { VerifiedComponent } from './verified/verified.component';
import { PnfComponent } from './pnf/pnf.component';
import { LoginComponent } from './unv/login/login.component';
import { RegisterComponent } from './unv/register/register.component';
import { DriverLocationComponent } from './driver-location/driver-location.component';


const routes: Routes = [
  {
    path:'unv',
    component:UnverifiedComponent,
    children:[
      
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signin',
        component:RegisterComponent
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      },
      {
        path:"maps",
        component:DriverLocationComponent
      },
      {
        path:"**",
        component:PnfComponent
      }
    ]
  },
  {
    path:'v',
    component:VerifiedComponent,
    children:[
    
      { path: 'admin', loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule),  },
      { path: 'vendor', loadChildren: () => import('../modules/vendor/vendor.module').then(m => m.VendorModule), },
      { path: 'vehicle', loadChildren: () => import('../modules/vehicle/vehicle.module').then(m => m.VehicleModule) ,},
      { path: 'organisation', loadChildren: () => import('../modules/org/org.module').then(m => m.OrgModule), },
      { path: 'employee', loadChildren: () => import('../modules/employee/employee.module').then(m => m.EmployeeModule),}
    ]
  },
  {
    path:'',
    redirectTo:'unv',
    pathMatch:'full'  
  },

  
  {
    path:'**',
    component:PnfComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
