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
  // token:string
  constructor(private http:HttpService,private login:LoginService,private toast:ToastrService,private router:Router){
    this.loginForm=new FormGroup({
      'email':new FormControl(null,Validators.required,),
      "password":new FormControl(null,Validators.required)
    })
    if(this.login.user!=undefined && this.login.user.userr!=undefined){
      this.router.navigateByUrl("/v/"+this.login.user.userr.role)
    }
    this.isLoading=false
    // this.token=localStorage.getItem("token")??""

    // if(this.token==""){
    //   this.isLoading=false
    // }
    // else{
    //   let userDetails:UserVendorDto=JSON.parse(localStorage.getItem("data")??"{}");
    //   if(userDetails.userr==undefined || userDetails.userr==null){
    //     this.http.getDetailsBytoken(this.token).subscribe(
    //       (any)=>{
    //         if(any.status==undefined){
    //             this.login.setUser(any)
                
    //         }else{
    //           localStorage.clear()
    //           this.isLoading=false
    //         }
  
    //       },
    //       (err)=>{
    //         localStorage.clear()
    //         this.isLoading=false
    //       }
    //     )
    //   }
    //   else{
    //     this.login.setUser(userDetails)
    //   }
    // }


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
   this.http.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe(
    (data)=>{
      if(data.status==undefined){
        console.log(data)
        this.login.setUser(data)
        
      }
      else{
        this.toast.warning(data.message)
      }
    },
    (err)=>{
      this.toast.warning("Error occured")
    }
   )

}
  clicked(){
    this.showPassword=!this.showPassword
  }

}
