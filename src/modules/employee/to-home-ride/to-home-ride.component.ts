import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/services/login.service';
import { Booking, BookingStatus } from 'src/models/booking';
import { HttpService } from 'src/services/http.service';
import { Ride, RideStatus } from 'src/models/ride';
import { ReqStatus } from 'src/models/statMsg';
@Component({
  selector: 'app-to-home-ride',
  templateUrl: './to-home-ride.component.html',
  styleUrls: ['./to-home-ride.component.css']
})
export class ToHomeRideComponent {

  isLoading:boolean=false;
  referenceId:string|null=null;
  bookCabForm:FormGroup
  rideDetais:Booking|null=null
  rideStatus:string=""
  showMap:boolean=false
  latitude:number=0
  longitude:number=0
  vehicleUsername:string=""
  constructor(private loggedInUser:LoginService,private toast:ToastrService,private http:HttpService){

    if(this.loggedInUser.user.employee?.to_home_ride!=null){
      this.referenceId=this.loggedInUser.user.employee.to_home_ride
      this.isLoading=true
      this.http.getRideDetails(this.referenceId??"").subscribe(
        (data)=>{
          this.rideDetais=data;
          if(this.rideDetais.status==BookingStatus.STARTED){
            this.showMap=true
            this.vehicleUsername=data.vehicleUsername??""
            this.http.getLatLon(data.vehicleUsername??"").subscribe(
              (latlon)=>{
                this.latitude=latlon.latitude
                this.longitude=latlon.longitude
              },
              (err)=>{
                this.toast.error(err.message)
              }
            )
          }

          this.isLoading=false
        },
        (err)=>{
          this.toast.error(err.message);
          this.isLoading=false
        }
      )

    }
    this.bookCabForm=new FormGroup({
      address:new FormControl("",Validators.required),
      street:new FormControl("",Validators.required),
      landmark:new FormControl(""),
      city:new FormControl("",Validators.required),
      pincode:new FormControl(null,Validators.required),
    })

  }

  refreshMap(){
    this.http.getLatLon(this.vehicleUsername).subscribe(
      (latlon)=>{
        this.latitude=latlon.latitude
        this.longitude=latlon.longitude
      },
      (err)=>{
        this.toast.error(err.message)
      }
    )
  }

  bookCab(){
    if (!this.bookCabForm.get("address")?.valid) {
      this.toast.warning("Name is required")
      return
    }
    if (!this.bookCabForm.get("street")?.valid) {
      this.toast.warning("Name is required")
      return
    }
    if (!this.bookCabForm.get("city")?.valid) {
      this.toast.warning("Name is required")
      return
    }
    if (!this.bookCabForm.get("pincode")?.valid) {
      this.toast.warning("Name is required")
      return
    }
    this.isLoading=true
    let booking:Booking={
      organisationUsername:this.loggedInUser.user.employee?.org_username?? "",
      to:`${this.bookCabForm.get("pincode")?.value} ${this.bookCabForm.get('address')?.value} ${this.bookCabForm.get('landmark')?.value} ${this.bookCabForm.get('street')?.value} ${this.bookCabForm.get('city')?.value}`
    }
    this.http.bookCab(booking,this.loggedInUser.user.userr?.username??" ").subscribe(
      (data)=>{
      
        this.toast.success(data.message)
        let updatedUserDetials=this.loggedInUser.user
        if(updatedUserDetials && updatedUserDetials.employee &&updatedUserDetials.employee.to_home_ride==null){
          updatedUserDetials.employee.to_home_ride=data.message.split(" ")[6];
          this.referenceId=data.message.split(" ")[6];
          this.http.getRideDetails(this.referenceId??"").subscribe(
            (data)=>{
              this.rideDetais=data;
              this.isLoading=false
            },
            (err)=>{
              this.toast.error(err.message);
              this.isLoading=false
            }
          )
          this.loggedInUser.updateUser(updatedUserDetials)
        }
      },
      (err)=>{
        this.isLoading=false
        this.toast.error(err.message)
      }
    )
  }
  share(){
    navigator.share({
      "title":"Track my ride",
      url:`${window.location.origin}/unv/maps?username=${this.vehicleUsername}`
    })
  }
  sos(){
    this.isLoading=true
    this.showMap=false
    this.http.sos(this.loggedInUser.user.userr?.username??"",
        this.loggedInUser.user.userr?.name??"",
        this.loggedInUser.user.userr?.number??"",
        this.loggedInUser.user.employee?.org_username??"",
        `${window.location.origin}/unv/maps?username=${this.vehicleUsername}`
      ).subscribe(
        (data)=>{
          this.isLoading=false
          this.showMap=true
          if(data.status=ReqStatus.SUCCESS){

            this.toast.success(data.message)
          }
          else{
            this.toast.error(data.message)
          }
          console.warn(data)
         
        },
        (err)=>{
          this.showMap=true
          this.isLoading=false
          this.toast.error(err.message)
          console.error(err)
          
        }
      )
  }

}
