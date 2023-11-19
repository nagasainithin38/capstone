import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgComponent } from './org.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmpListComponent } from './emp-list/emp-list.component';

const routes: Routes = [
  {path:"emp",component:EmpListComponent},
  { path: 'home', component: OrgComponent },
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"add",component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
