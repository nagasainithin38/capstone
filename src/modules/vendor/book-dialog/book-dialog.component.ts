import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/models/booking';
import { ReqStatus } from 'src/models/statMsg';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent {
  bookings:any
  isLoading=false
  bookingForm:FormGroup
       constructor(@Inject(MAT_DIALOG_DATA) public data: {selectedUsers: Array<Booking>},private dialog:MatDialog,private toast:ToastrService,private http:HttpService,private loggedInUser:LoginService) {
        console.log(data)
        this.bookings=data
        this.bookingForm=new FormGroup({
          from:new FormControl("",Validators.required),
          to:new FormControl("",Validators.required),
          start:new FormControl(null,Validators.required),
          end:new FormControl(null,Validators.required)
        })
        }



  book(){

    if(this.bookingForm.get('from')?.valid==false){
      this.toast.error("Pickup field is required")
      return
    }
    if(this.bookingForm.get('to')?.valid==false){
      this.toast.error("Drop field is required")
      return
    }
    if(this.bookingForm.get('start')?.valid==false){
      this.toast.error("pickup time  is required")
      return
    }
    if(this.bookingForm.get('end')?.valid==false){
      this.toast.error("Drop time is required")
      return
    }
  
    if(parseInt(this.bookingForm.get("start")?.value)!=this.bookingForm.get("start")?.value){
      this.toast.error("Enter valid pickup time")
      return
    }
    if(parseInt(this.bookingForm.get("end")?.value)!=this.bookingForm.get("end")?.value){
      this.toast.error("Enter valid Drop time")
      return
    }
    let employeeIds:Array<string>=[]
    for(let i=0;i<this.bookings.length;i++){
      employeeIds.push(this.bookings[i].mid);
    }

    let body={
      employeeIds:employeeIds,
      start:this.bookingForm.get('start')?.value,
      end:this.bookingForm.get('end')?.value,
      from:this.bookingForm.get('from')?.value.toString(),
      to:this.bookingForm.get('to')?.value.toString()
    }
    this.isLoading=true
    this.http.createRide(body,this.loggedInUser.user.userr?.username??"").subscribe(
      (result)=>{
        if(result.status==ReqStatus.CREATED){
          this.isLoading=false
          this.dialog.closeAll()
          this.toast.success(result.message)
          
        }
        else{
          this.isLoading=false
          this.toast.error(result.message)
        }
      },
      (err)=>{
        this.isLoading=false
        this.toast.error(err.message)
      }
    )

  }
  close(){
    this.dialog.closeAll()
  }
}
