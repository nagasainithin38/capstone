import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { Vehicle } from 'src/models/vehicle';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css']
})
export class AllVehiclesComponent {

  isLoading:boolean=true

  data:Array<Vehicle>=[]
  constructor(private http:HttpService,private loggedInUser:LoginService,private toast:ToastrService){


    this.http.getAllVehicles(this.loggedInUser.user.userr?.username ?? "").subscribe(
      (data)=>{
        this.data=data
        this.isLoading=false
      },
      (err)=>{
        this.isLoading=false
        this.toast.warning(err.message);
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
