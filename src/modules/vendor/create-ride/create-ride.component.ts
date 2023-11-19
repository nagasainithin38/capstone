import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/models/booking';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.css']
})
export class CreateRideComponent {

  isLoading:boolean=true
  isTableLoading:boolean=false
  organisationList:Array<string>=[]

  selectedValue:string|null=null
  checkedList:Array<number>=[]
  pendingBookingList:Array<Booking>=[]

  constructor(private http:HttpService,private loggedInUser:LoginService,private toast:ToastrService,public dialog: MatDialog){


    this.http.getOrganisationList(this.loggedInUser.user.userr?.username??"").subscribe(
      (data)=>{
          this.organisationList=data
          if(data.length!=0)
          this.selectedValue=data[0]
          this.isLoading=false
      },
      (err)=>{
        this.toast.error(err.message)
        this.isLoading=false
      }
    )
    
  }

  search(){
    console.log(this.selectedValue)
    if(this.selectedValue==null){
      this.toast.error("No organisation assigned")
      return
    }
    this.isTableLoading=true;
    this.http.getPendingBookings(this.selectedValue).subscribe(
      (data)=>{
        this.pendingBookingList=data
        this.isTableLoading=false
      },
      (err)=>{
        this.toast.error(err.message)
        this.isTableLoading=false
      }
    )
  }

  optionChanged(e: any){
    console.log(e.target.value)
  this.selectedValue=e.target.value
  }

  checkBox(e:any,index:number){

    let isChecked=false
    let checkedIndex=-1
    for(let i=0;i<this.checkedList.length;i++){
      if(index==this.checkedList[i]){
        isChecked=true
        checkedIndex=i;
        break
      }
    }

    if(isChecked==false){

      if(this.checkedList.length>=4){
        e.target.checked=false
        this.toast.error("cannot select more than 4")
      }
      else{
        this.checkedList.push(index)
      }
    }
    else{
      this.checkedList.splice(checkedIndex,1);
    }


  }

  book(){
      let selectedUsers:Array<Booking>=[]
    for(let i=0;i<this.checkedList.length;i++){
      selectedUsers.push(this.pendingBookingList[this.checkedList[i]])
    }
    let dialogRef=  this.dialog.open(BookDialogComponent,{data:selectedUsers})
    dialogRef.afterClosed().subscribe(()=>{
      this.checkedList=[]
      this.search()
  
    })
  }

}
