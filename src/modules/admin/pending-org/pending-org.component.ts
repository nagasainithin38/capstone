import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-pending-org',
  templateUrl: './pending-org.component.html',
  styleUrls: ['./pending-org.component.css']
})
export class PendingOrgComponent {

  isLoading:boolean=true
  pendingVendors:Array<UserVendorDto>=[]
  constructor(private http:HttpService,private toast:ToastrService){

    this.http.getPending("organisation",'pending').subscribe(
      (data)=>{
        this.pendingVendors=data;
        this.isLoading=false;
      },
      (err)=>{
        this.toast.error(err.message)
      }
    )

  }

  approve(index:number){

    this.isLoading=true
    this.http.approve(this.pendingVendors[index].userr?.username??" ").subscribe(
      (data)=>{
        this.isLoading=false
        if(data.status==ReqStatus.SUCCESS){
          this.pendingVendors.splice(index,1)
          this.toast.success(data.message)
        }
        else{
          this.toast.error(data.message)
        }
      },
      (err)=>{
        this.isLoading=false
        this.toast.error(err.message)
      }
    )


  }


}
