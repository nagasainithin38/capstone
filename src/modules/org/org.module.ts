import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OrgRoutingModule } from './org-routing.module';
import { OrgComponent } from './org.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmpListComponent } from './emp-list/emp-list.component';

@NgModule({
  declarations: [
    OrgComponent,
    AddEmployeeComponent,
    EmpListComponent
  ],
  imports: [
    CommonModule,
    OrgRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrgModule { }
