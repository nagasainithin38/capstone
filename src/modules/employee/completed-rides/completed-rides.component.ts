import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/models/booking';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-completed-rides',
  templateUrl: './completed-rides.component.html',
  styleUrls: ['./completed-rides.component.css']
})
export class CompletedRidesComponent {

completedRides:Array<Booking>=[]
isLoading:boolean=true

constructor(private loggedInuser:LoginService,private http:HttpService,private toast:ToastrService){
  this.http.getCompletedRides(this.loggedInuser.user.userr?.username??" ").subscribe(
    (data)=>{
      this.completedRides=data
      this.isLoading=false
    },
    (err)=>{
      this.isLoading=false
      this.toast.error(err.message);
    }
  )


}


}
