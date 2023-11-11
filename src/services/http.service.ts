import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatMsg } from 'src/models/statMsg';
import { UserVendorDto } from 'src/models/uservendDto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,private loggedInUser:LoginService) {

  }

  backendUrl:string="http://localhost:8080/"

  getDetailsBytoken(token:string):Observable<any>{
    // console.warn("http://localhost:8080/"+`user/isLogin?token=${token}`)
    return this.http.get(this.backendUrl+`user/isLogin?token=${token}`)
  }

  login(username:string,password:string):Observable<any>{
    return this.http.post(this.backendUrl+"user/login",{username,password})
  }

  logout():Observable<StatMsg>{
    return this.http.get<StatMsg>(this.backendUrl+`user/logout?username=${this.loggedInUser.user.userr?.username}`)
  }

  signin(body:UserVendorDto):Observable<StatMsg>{
      return this.http.post<StatMsg>(this.backendUrl+"user/add",body)
  }
  addVehicleOrEmployee(body:UserVendorDto,code:string):Observable<StatMsg>{
    return this.http.post<StatMsg>(this.backendUrl+"user/add?code="+code,body)
}

}
