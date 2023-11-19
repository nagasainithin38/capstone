import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserVendorDto } from 'src/models/uservendDto';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';
import { ReqStatus } from 'src/models/statMsg';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  user!:UserVendorDto
  constructor(private router:Router,private http:HttpService,private toast:ToastrService) { 
    this.isUserPresent()
  }

  isUserPresent(){
    let token=localStorage.getItem('token')
    if(token!=null){
      this.setUser(JSON.parse(localStorage.getItem('data')??"{}"))
      if(this.user && this.user.userr && this.user.userr.role){
        this.router.navigateByUrl(`/v/${this.user.userr?.role}`)
      }
    }
  }
updateUser(user:UserVendorDto){
  this.user=user
  localStorage.setItem("token",this.user.token??"")
  localStorage.setItem("role",this.user.userr?.role??"")
  localStorage.setItem("data",JSON.stringify(user))
}
  setUser(user:UserVendorDto){
    this.user=user
    localStorage.setItem("token",this.user.token??"")
    localStorage.setItem("role",this.user.userr?.role??"")
    localStorage.setItem("data",JSON.stringify(user))
    
      this.router.navigateByUrl(`/v/${this.user.userr?.role}`)
    
  }
  clearUser(){
            localStorage.clear()
            
            this.router.navigateByUrl("/unv/login")
           
  }
  login(username:string,password:string){
    this.http.login(username,password).subscribe(
      (data)=>{
        if(data.status==undefined){
          this.setUser(data)
        }
        else{
          this.toast.error(data.message)
        }

      },
      (err)=>{
          console.log(err.message)
      }
    )

  }
  logout(){
    if(this.user.userr!=undefined)
    {
      this.http.logout(this.user.userr?.username).subscribe(
        (data)=>{
          if(data.status==ReqStatus.SUCCESS){
          }
          else{
            this.toast.warning(data.message)
          }
        },
        (err)=>{
          this.toast.error(err.message)
        }
      )
    }
    this.clearUser()
  }

}