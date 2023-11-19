import { Component, OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/models/booking';
import { ReqStatus } from 'src/models/statMsg';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';



@Component({
  selector: 'app-curr-ride',
  templateUrl: './curr-ride.component.html',
  styleUrls: ['./curr-ride.component.css']
})
export class CurrRideComponent implements OnDestroy {

permission:boolean=false
latitude:number=0
longitude:number=0
interval!:any;
c:number=0
isLoading:boolean=true
bookDetails:Array<Booking>=[]
constructor(private toast:ToastrService,private http:HttpService,private loggedInUser:LoginService,private router:Router){

if(this.loggedInUser.user.vehicle?.currRide!=null){
this.c=1
  this.interval=setInterval(()=>{
  
  
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        this.c+=1
        this.latitude=position.coords.latitude
        this.longitude=position.coords.longitude
        this.http.updateLoc(this.loggedInUser.user.userr?.username??"",this.latitude,this.longitude).subscribe(
          (data)=>{
            console.log(data)
          },
          (err)=>{
            console.log(err)
          }
        )
      },
      (err)=>{
        console.error(err.message)
        this.toast.error("enable location")
        console.log("le")
      }
    )
  
  
  },15000)
  console.log(this.loggedInUser.user.vehicle?.currRide)
  this.http.getRideEmpDetails(this.loggedInUser.user.vehicle?.currRide??"").subscribe(
    (data)=>{
      this.isLoading=false
      this.bookDetails=data
    },
    (err)=>{
      this.isLoading=false
      this.toast.error(err.message);
    }
  )
}
else{
  this.isLoading=false
}

}


endRide(){
  this.isLoading=true
  this.http.endRide(this.loggedInUser.user.userr?.username??"").subscribe(
    (data)=>{
      this.isLoading=false
      if(data.status==ReqStatus.SUCCESS){
        this.toast.success(data.message)
        clearInterval(this.interval);
        let user=this.loggedInUser.user
        
        let upcomingRide:Array<string>= user.vehicle?.upcomingRide.filter(e=>e!=user.vehicle!.currRide) as Array<string>
        let completedRides=[...user.vehicle!.completedRides,user.vehicle?.currRide]
        user.vehicle!.currRide=null
        user.vehicle!.upcomingRide=upcomingRide
        user.vehicle!.completedRides=completedRides
        this.loggedInUser.setUser(user)

      }
    },
    (err)=>{
      this.isLoading=false
      this.toast.error(err.message)
    }
  )
}


ngOnDestroy(): void {
  console.log(this.interval)
  clearInterval(this.interval)
  console.warn(this.interval);
}


}
