import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgRoutingModule } from './org-routing.module';
import { OrgComponent } from './org.component';


@NgModule({
  declarations: [
    OrgComponent
  ],
  imports: [
    CommonModule,
    OrgRoutingModule
  ]
})
export class OrgModule { }
