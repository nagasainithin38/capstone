import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserVendorDto } from 'src/models/uservendDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  user!:UserVendorDto
  constructor(private router:Router) { }

  setUser(user:UserVendorDto){
    this.user=user
    localStorage.setItem("token",this.user.token??"")
    localStorage.setItem("role",this.user.userr?.role??"")
    localStorage.setItem("data",JSON.stringify(user))
    this.router.navigateByUrl(`/v/${this.user.userr?.role}`)
  }
}