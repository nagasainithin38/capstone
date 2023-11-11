import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organisation } from 'src/models/organisation';
import { ReqStatus } from 'src/models/statMsg';
import { Userr } from 'src/models/userr';
import { UserVendorDto } from 'src/models/uservendDto';
import { vendor } from 'src/models/vendor';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLoading:boolean=false
  signInForm: FormGroup

  roleChecked: string = 'organisation'

  constructor(private router: Router, private toast: ToastrService,private http:HttpService) {

    this.signInForm = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      re_password: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
      pincode: new FormControl(""),
      address: new FormControl(""),
      bt: new FormControl(""),
      description: new FormControl(""),
      start: new FormControl(0),
      end: new FormControl(0)

    })

  }


  signIn() {
    if (!this.signInForm.get("name")?.valid) {
      this.toast.warning("Name is required")
      return
    }
    if (!this.signInForm.get("phoneNumber")?.valid) {
      this.toast.warning("Phone number is required")
      return
    }
    if (!this.signInForm.get("email")?.valid) {
      this.toast.warning("Email is required")
      return
    }
    if (!this.signInForm.get("username")?.valid) {
      this.toast.warning("username is required")
      return
    }
    if (!this.signInForm.get("password")?.valid) {
      this.toast.warning("Password is required")
      return
    }
    if (!this.signInForm.get("re_password")?.valid) {
      this.toast.warning("Password is required")
      return
    }

    if (this.signInForm.get("password")?.value != this.signInForm.get("re_password")?.value) {
      this.toast.warning("Password must be same")
      return
    }
    if (!this.signInForm.get("code")?.valid) {
      this.toast.warning("code is required")
      return
    }

    if (this.roleChecked == 'organisation') {

      let pincode = this.signInForm.get("pincode")?.value.toString()
      let address = this.signInForm.get("address")?.value
      let bt = this.signInForm.get("bt")?.value
      let description = this.signInForm.get("description")?.value
      if (pincode.lengt == 0) {
        this.toast.warning("Pincode is required")
        return
      }
      if (address.lengt == 0) {
        this.toast.warning("address is required")
        return
      }
      if (bt.lengt == 0) {
        this.toast.warning("Business Type is required")
        return
      }
      if (description.lengt == 0) {
        this.toast.warning("Description is required")
        return
      }
      if (this.signInForm.get("start")?.value == this.signInForm.get("end")) {
        this.toast.warning("Start and end time of organisation should not be same")
        return
      }
    }



    this.isLoading=true


    let userr: Userr = {
      username: this.signInForm.get('username')?.value,
      password: this.signInForm.get("password")?.value,
      name: this.signInForm.get("name")?.value,
      email: this.signInForm.get("email")?.value,
      number: this.signInForm.get("number")?.value,
      role: this.roleChecked,
      Object_id: null,
      image: "",
      code: this.signInForm.get("code")?.value

    }
    let signinObject: UserVendorDto
    if (this.roleChecked == 'vendor') {
      let vendor: vendor = {
        verificationStatus: "PENDING",
        vehicleId: [],
        document: "",
        username: this.signInForm.get("username")?.value,
        vehicleCount: 0

      }
      signinObject = {
        userr: userr,
        vendor: vendor
      }

    }
    else {
      let organisation: Organisation = {
        verificationStatus: "PENDING",
        username: this.signInForm.get("username")?.value,
        address: this.signInForm.get("address")?.value,
        vendorAssigned: false,
        vendorUsername: "",
        businessType: this.signInForm.get("bt")?.value,
        description: this.signInForm.get("description")?.value,
        startTiming: this.signInForm.get("start")?.value,
        endTiming: this.signInForm.get("end")?.value,
        websiteLink: "",
        employeesList: [],
        code: this.signInForm.get("code")?.value
      }
      signinObject = {
        userr: userr,
        organisation: organisation
      }
    }

    this.http.signin(signinObject).subscribe(
      (data)=>{
        this.isLoading=false
        if(data.status==ReqStatus.CREATED){
          this.toast.success("User created")
          this.router.navigateByUrl("/unv/login")
        }
        else if(data.status==ReqStatus.FAILED){
          this.toast.warning(data.message)
        }
        else{
          this.toast.warning(data.message)
        }
        
      },
      (err)=>{
        this.isLoading=false
        this.toast.error(err.message)
      }
    )

  }


  checked(x: string) {
    this.roleChecked = x
  }

  navigate(role: string) {
    this.router.navigateByUrl(`/v/${role}`)
  }

}
