import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  isLoading:boolean=true
  showPassword:boolean=false
  loginForm!:FormGroup
  constructor(private http:HttpService,private login:LoginService,private toast:ToastrService,private router:Router){
    this.loginForm=new FormGroup({
      'email':new FormControl(null,Validators.required,),
      "password":new FormControl(null,Validators.required)
    })
    this.login.isUserPresent()
    this.isLoading=false
      


  }

Login(){

   if(this.loginForm.get('email')?.valid==false){
    this.toast.warning("Enter username")
    return
   }
   if(this.loginForm.get('password')?.valid==false){
    this.toast.warning("Enter password")
    return
   }
  this.login.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value)

}
  clicked(){
    this.showPassword=!this.showPassword
  }

}
