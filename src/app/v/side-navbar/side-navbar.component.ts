import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpService } from 'src/services/http.service';
import { ReqStatus } from 'src/models/statMsg';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

role!:string
isLoading:boolean=false
constructor(private http:HttpService,private toast:ToastrService,private router:Router){

}
  ngOnInit(): void {
    this.role=localStorage.getItem('role')??""
  }

logout(){
  this.isLoading=true
  this.http.logout().subscribe(
    (status)=>{
      if(status.status==ReqStatus.SUCCESS){
        localStorage.clear()
        this.isLoading=false
        this.router.navigateByUrl("/unv/login")
      }
      else{
        this.isLoading=false
        this.toast.warning(status.message)
      }
    },
    ()=>{}
  )
}


}
