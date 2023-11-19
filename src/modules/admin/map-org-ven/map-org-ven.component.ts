import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Organisation } from 'src/models/organisation';
import { vendor } from 'src/models/vendor';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-map-org-ven',
  templateUrl: './map-org-ven.component.html',
  styleUrls: ['./map-org-ven.component.css']
})
export class MapOrgVenComponent {

isVendorInserted:boolean=false
isOrganisationInserted:boolean=false
vendors:Array<vendor>=[]
org:Array<Organisation>=[]
res:any[]=[]

isLoading:boolean=true

constructor(private http:HttpService,private toast:ToastrService){
  this.http.getVendorList().subscribe(
    (data)=>{
      this.vendors=data
    },
    (err)=>{
      this.toast.error(err.message)
    }
  )
  this.http.getUnassignedOrgs().subscribe(
    (data)=>{
      this.org=data
      this.isLoading=false
    },
    (err)=>{
      this.toast.error(err.message)
    }
  )
}

onDrop(e:any){
  console.log(e.previousContainer.id,e.container.id)  
  if((e.previousContainer.id=='ven'&&e.container.id=='org')||(e.previousContainer.id=='org'&&e.container.id=='ven'))
  {
    this.toast.error("Cannot perform the operation")
    return
  }
  if(e.container.id=='org'&&e.previousContainer.data[e.previousIndex].vehicleCount!=null){
    this.toast.error("Cannot perform the operation")
    return
  }
  console.log(e.container.data)
  if(e.container.id=='ven'&&e.previousContainer.data[e.previousIndex].vehicleCount==null){
    this.toast.error("Cannot perform the operation")
    return
  }
  if(e.previousContainer.id=='org'&&this.isOrganisationInserted){
    this.toast.error("only one organisation to be selected")
    return
  }
  if(e.previousContainer.id=='ven'&&this.isVendorInserted){
    this.toast.error("only one organisation to be selected")
    return
  }

  if(e.container.id=='res'&&e.previousContainer.id=='org'){
    this.isOrganisationInserted=true
  }
  if(e.container.id=='res'&&e.previousContainer.id=='ven'){
    this.isVendorInserted=true
  }
  if(e.container.id=='org'&&e.previousContainer.id=='res'){
    this.isOrganisationInserted=false
  }
  if(e.container.id=='ven'&&e.previousContainer.id=='res'){
    this.isVendorInserted=false
  }
  if (e.previousContainer == e.container) {
    moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
  } else {
    transferArrayItem(
      e.previousContainer.data,
      e.container.data,
      e.previousIndex,
      e.currentIndex
    );
  }
}
map(){
  let vendorUn=""
  let OrgUn=""
  let orgIndex=0
  if(this.res[0].vehicleCount==null){
    orgIndex=0
    OrgUn=this.res[0].username
    vendorUn=this.res[1].username
  }
  else{
    orgIndex=1
    OrgUn=this.res[1].username
    vendorUn=this.res[0].username
  }
  this.isLoading=true
this.http.map(vendorUn,OrgUn).subscribe(
(data)=>{
  this.toast.success(data.message)
  this.isLoading=false
  this.res.splice(orgIndex,1);
},
(err)=>{this.isLoading=false;this.toast.error(err.message)}
)
}

}
