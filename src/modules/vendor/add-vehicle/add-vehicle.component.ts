import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { Userr } from 'src/models/userr';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {

  vehicleForm:FormGroup
  isLoading:boolean=false;
  constructor(private toast:ToastrService,private http:HttpService,private user:LoginService){
    this.vehicleForm=new FormGroup({
      name:new FormControl("",Validators.required),
      phoneNumber:new FormControl(null,Validators.required),
      username:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required),
      email:new FormControl("",Validators.required),
      image:new FormControl(""),
      numberplate:new FormControl("",Validators.required),
    })
    console.warn(this.user.user)
  }


  createVehicle(){

    if(!this.vehicleForm.get('name')?.valid){
        this.toast.error("Name is required")
        return
    }
    if(!this.vehicleForm.get('phoneNumber')?.valid){
      this.toast.error("Phone number is required")
      return
    }
    if(!this.vehicleForm.get('username')?.valid){
      this.toast.error("Username is required")
      return
    }
    if(!this.vehicleForm.get('password')?.valid){
      this.toast.error("Password is required")
      return
    }
    if(!this.vehicleForm.get('email')?.valid){
      this.toast.error("Email is required")
      return
    }
    if(!this.vehicleForm.get('numberplate')?.valid){
      this.toast.error("Number Plate is required")
      return
    }

    let vehicle:any={
      number_plate: this.vehicleForm.get('numberplate')?.value,
      username: this.vehicleForm.get('username')?.value,
      vendor_username:this.user.user.userr?.username , 
      images: [],
      completedRides: [], 
      upcomingRide: [],
      latitude: 0,
      longitude: 0, 
    }
 
    let userr:any={
      role:"vehicle",
      username:this.vehicleForm.get('username')?.value,
      password:this.vehicleForm.get('password')?.value,
      name:this.vehicleForm.get('name')?.value,
      email:this.vehicleForm.get('email')?.value,
      number:this.vehicleForm.get('number')?.value,
      code:this.user.user.userr?.code??""
    }
    
    let body:UserVendorDto={
      vehicle:vehicle,
      userr:userr
    }

    this.isLoading=true;
    this.http.signin(body).subscribe(
      (data)=>{
        this.isLoading=false
        if(data.status==ReqStatus.FAILED){
          this.toast.error(data.message)
        }
        if(data.status==ReqStatus.CREATED){
          this.toast.success(data.message)
        }
      },
      (err)=>{
        this.isLoading=false
        this.toast.error(err.message)
      }
    )
    console.error(5)
  }

}
