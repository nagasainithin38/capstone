import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.component.html',
  styleUrls: ['./driver-location.component.css']
})
export class DriverLocationComponent {

isLoading=true
username=""
latitude:number=0
  longitude:number=0
  showMap=false
  constructor(private activatedRoute:ActivatedRoute,private http:HttpService,private toast:ToastrService){

    this.activatedRoute.queryParams.subscribe(
      (params)=>{
        this.username=params['username']
      }
    )
      this.http.getLatLon(this.username).subscribe(
        (latlon)=>{
          this.latitude=latlon.latitude
          this.longitude=latlon.longitude
          this.showMap=true
          this.isLoading=false
        },
        (err)=>{
          this.toast.error(err.message);
        }
      )

  }
  refreshMap(){
    this.isLoading=true
    this.http.getLatLon(this.username).subscribe(
      (latlon)=>{
        this.latitude=latlon.latitude
        this.longitude=latlon.longitude
        this.showMap=true
        this.isLoading=false
      },
      (err)=>{
        this.toast.error(err.message)
      }
    )
  }






}
