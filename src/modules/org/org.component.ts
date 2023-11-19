import { coerceStringArray } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Organisation } from 'src/models/organisation';
import { ReqStatus } from 'src/models/statMsg';
import { Userr } from 'src/models/userr';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent {


  isLoading = false
  signInForm: FormGroup
  disabled = true
  constructor(private router: Router, private toast: ToastrService, private http: HttpService, private loggedInuser: LoginService) {

    this.signInForm = new FormGroup({
      name: new FormControl(loggedInuser.user.userr?.name ?? "", Validators.required),
      number: new FormControl(loggedInuser.user.userr?.number ?? "", Validators.required),
      username: new FormControl(loggedInuser.user.userr?.username ?? "", Validators.required),
      email: new FormControl(loggedInuser.user.userr?.email ?? "", Validators.required),
      code: new FormControl(loggedInuser.user.userr?.code ?? "", Validators.required),
      address: new FormControl(loggedInuser.user.organisation?.address ?? ""),
      bt: new FormControl(loggedInuser.user.organisation?.businessType ?? ""),
      description: new FormControl(loggedInuser.user.organisation?.description ?? ""),
      start: new FormControl(loggedInuser.user.organisation?.startTiming),
      end: new FormControl(loggedInuser.user.organisation?.endTiming)

    })

  }
  update() {
    if (!this.signInForm.get("name")?.valid) {
      this.toast.warning("Name is required")
      return
    }
    if (!this.signInForm.get("number")?.valid) {
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

    if (!this.signInForm.get("code")?.valid) {
      this.toast.warning("code is required")
      return
    }
    let address = this.signInForm.get("address")?.value
    let bt = this.signInForm.get("bt")?.value
    let description = this.signInForm.get("description")?.value
    if (address.length == 0) {
      console.log("ge")
      this.toast.warning("address is required")
      return
    }
    if (bt.length == 0) {
      this.toast.warning("Business Type is required")
      return
    }
    if (description.length == 0) {
      this.toast.warning("Description is required")
      return
    }
    if(this.signInForm.get('start')?.value==null )
    {
      this.toast.warning("start timing is required")
      return
    }
    if(this.signInForm.get("end")?.value==null){
      this.toast.warning("end timing is required")
      return
    }
    if (this.signInForm.get("start")?.value == this.signInForm.get("end")) {
      this.toast.warning("Start and end time of organisation should not be same")
      return
    }
  let  user: Userr={
    username:this.loggedInuser.user.userr?.username??"",
    name:this.signInForm.get('name')?.value,
    email:this.signInForm.get('email')?.value,
    number:(this.signInForm.get('number')?.value).toString(),
    role:"organisation",
    code:this.loggedInuser.user.userr?.code??"",
    password:""
   }

let org:Organisation={
  startTiming: this.signInForm.get('start')?.value,
  endTiming: this.signInForm.get('end')?.value,
  description: this.signInForm.get('description')?.value,
  businessType: this.signInForm.get('bt')?.value,
  address: this.signInForm.get('address')?.value,
  username: this.loggedInuser.user.userr?.username ?? "",
  id: undefined,
  vendorAssigned: false,
  vendorUsername: '',
  websiteLink: '',
  employeesList: [],
  code: ''
}

let body:UserVendorDto={
  userr:user,
  organisation:org
}

this.isLoading=true
this.http.updateOrg(body).subscribe(
  (data)=>{
    this.isLoading=false
    if(data.status==ReqStatus.SUCCESS){
      this.toast.success(data.message)
    }
    else{
      this.toast.error("Error occured")
    }
  },
  (err)=>{
    this.isLoading=false
    this.toast.error(err.message)
  }
)

  }
}
