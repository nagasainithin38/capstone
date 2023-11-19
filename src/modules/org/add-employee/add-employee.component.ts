import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  isLoading: boolean = false


  employeeForm: FormGroup

  constructor(private toast: ToastrService,private loggedInUser:LoginService,private http:HttpService) {
    this.employeeForm = new FormGroup({
      name: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      image:new FormControl("")
    })
  }

  createEmployee() {
    if (!this.employeeForm.get('name')?.valid) {
      this.toast.error("Name is required")
      return
    }
    if (!this.employeeForm.get('phoneNumber')?.valid) {
      this.toast.error("Phone number is required")
      return
    }
    if (!this.employeeForm.get('username')?.valid) {
      this.toast.error("Username is required")
      return
    }
    if (!this.employeeForm.get('password')?.valid) {
      this.toast.error("Password is required")
      return
    }
    if (!this.employeeForm.get('email')?.valid) {
      this.toast.error("Email is required")
      return
    }

    let employee:any={
      org_username:this.loggedInUser.user.userr?.username ??"",
      completedRides:[]
    }
    let userr:any={
      role:"employee",
      username:this.employeeForm.get('username')?.value,
      password:this.employeeForm.get('password')?.value,
      name:this.employeeForm.get('name')?.value,
      email:this.employeeForm.get('email')?.value,
      number:this.employeeForm.get('number')?.value,
      image:"",
      code:this.loggedInUser.user.userr?.code??""
    }
    let newUser:UserVendorDto={
      userr:userr,
      employee:employee
    }

    this.isLoading=true;
    this.http.signin(newUser).subscribe(
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

  }

}
