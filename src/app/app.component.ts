import { Component } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private login:LoginService){
      this.login.isUserPresent()
  }
}
