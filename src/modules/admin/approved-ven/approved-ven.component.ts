import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-approved-ven',
  templateUrl: './approved-ven.component.html',
  styleUrls: ['./approved-ven.component.css']
})
export class ApprovedVenComponent {
  isLoading:boolean=true
  pendingVendors:Array<UserVendorDto>=[]
  constructor(private http:HttpService,private toast:ToastrService){

    this.http.getPending("vendor","verified").subscribe(
      (data)=>{
        this.pendingVendors=data;
        this.isLoading=false;
      },
      (err)=>{
        this.toast.error(err.message)
      }
    )

  }

  
 

}
