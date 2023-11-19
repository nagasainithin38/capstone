import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent {

isLoading=true
data:Array<UserVendorDto>=[]
constructor(private loggedInUser:LoginService,private http:HttpService,private toast:ToastrService){

  this.http.getMappedDetails(this.loggedInUser.user.userr?.username??"").subscribe(
    (data)=>{
      this.isLoading=false
      this.data=data
    },
    (err)=>{
      this.isLoading=false
      this.toast.error(err.message)
    }
  )


}

delete(username:string|undefined,index:number){
  this.isLoading=true
  this.http.deleteEmp(username??"").subscribe(
    (data)=>{
      this.isLoading=false
      if(data.status==ReqStatus.DELETED){
        this.data.splice(index,1)
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
