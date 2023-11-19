import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { Userr } from 'src/models/userr';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {

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
  
   
    let user: Userr = {
      username: this.loggedInuser.user.userr?.username ?? "",
      name: this.signInForm.get('name')?.value,
      email: this.signInForm.get('email')?.value,
      number: (this.signInForm.get('number')?.value).toString(),
      role: "vendor",
      code: this.loggedInuser.user.userr?.code ?? "",
      password: ""
    }
    let body: UserVendorDto = {
      userr: user
    }

    this.isLoading = true
    this.http.updateOrg(body).subscribe(
      (data) => {
        this.isLoading = false
        if (data.status == ReqStatus.SUCCESS) {
          this.toast.success(data.message)
        }
        else {
          this.toast.error("Error occured")
        }
      },
      (err) => {
        this.isLoading = false
        this.toast.error(err.message)
      }
    )

  }
}
