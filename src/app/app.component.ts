import { Component } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quickcar';
  token!:string
  constructor(private login:LoginService,private http:HttpService){
    this.token=localStorage.getItem("token")??""
    if(this.token==""){
   
    }
    else{
      this.http.getDetailsBytoken(this.token).subscribe(
        (any)=>{
          if(any.status==undefined){
              this.login.setUser(any)
          }else{
            localStorage.clear()
        
          }

        },
        (err)=>{
          localStorage.clear()
        }
      )
    }

  }
}
