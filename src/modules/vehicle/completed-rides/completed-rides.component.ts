import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ride } from 'src/models/ride';
import { ReqStatus } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-completed-rides',
  templateUrl: './completed-rides.component.html',
  styleUrls: ['./completed-rides.component.css']
})
export class CompletedRidesComponent {
  upcomingRide:Array<Ride>=[]

  isLoading:boolean=true
    constructor(private http:HttpService,private loggedInUser:LoginService,private toast:ToastrService,private router:Router){
  
  this.http.getVehicleAllRideDetails(this.loggedInUser.user.vehicle?.completedRides??[]).subscribe(
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
  

  
  
  
  }
  
