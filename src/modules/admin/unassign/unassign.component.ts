import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/models/employee';
import { Organisation } from 'src/models/organisation';
import { ReqStatus } from 'src/models/statMsg';
import { Userr } from 'src/models/userr';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-unassign',
  templateUrl: './unassign.component.html',
  styleUrls: ['./unassign.component.css']
})
export class UnassignComponent {
  data:Array<Organisation>=[]
isLoading:boolean=true
  constructor(private http:HttpService,private toast:ToastrService){


    this.http.getAssignedList().subscribe(
      (data)=>{
        this.isLoading=false
        this.data=data
      },
      (err)=>{
        this.isLoading=false
        this.toast.error(err.message);
      }
    )

  }

  unassign(username:string,index:number){
    this.isLoading=true
    this.http.unassign(username).subscribe(
      (data)=>{
        this.isLoading=false
        if(data.status=ReqStatus.SUCCESS){
          this.data.splice(index,1)
          this.toast.success(data.message)
        }
        else{
          this.toast.error(data.message)
        }
      },
      (err)=>{
        this.toast.error(err.message)
      }
    )
  }
}
