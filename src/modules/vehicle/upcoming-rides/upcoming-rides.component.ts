import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ride } from 'src/models/ride';
import { ReqStatus } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-upcoming-rides',
  templateUrl: './upcoming-rides.component.html',
  styleUrls: ['./upcoming-rides.component.css']
})
export class UpcomingRidesComponent {



upcomingRide:Array<Ride>=[]

isLoading:boolean=true
  constructor(private http:HttpService,private loggedInUser:LoginService,private toast:ToastrService,private router:Router){

this.http.getVehicleAllRideDetails(this.loggedInUser.user.vehicle?.upcomingRide??[]).subscribe(
  (data)=>{
    this.upcomingRide=data
    this.isLoading=false
  },
  (err)=>{
    this.toast.error(err.message)
    this.isLoading=false
  }
)



  }

startRide(index:number){
  if(this.loggedInUser.user.vehicle?.currRide!=null){
    this.toast.error(`Complete current ride ${this.loggedInUser.user.vehicle.currRide} befor starting new ride`)
    return
  }
  this.isLoading=true
  this.http.startRide(this.loggedInUser.user.userr?.username?? "",this.upcomingRide[index].mid).subscribe(
    (data)=>{
      this.isLoading=false
      if(data.status==ReqStatus.SUCCESS){
         
          let newUserDetails:UserVendorDto=this.loggedInUser.user
          newUserDetails.vehicle!.currRide=this.upcomingRide[index].mid
          this.loggedInUser.updateUser(newUserDetails)
          this.toast.success(data.message)
          this.router.navigateByUrl("/v/vehicle/currRide");

      }
    },
    (err)=>{
      this.isLoading=false
      this.toast.error(err.message);
    }
  )
}



}
