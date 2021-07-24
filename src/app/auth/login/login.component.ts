
import { Component, OnInit } from '@angular/core';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  login: any = {};
  

  constructor(
    public auth: AuthComponent
  ) { 
  }

  ngOnInit(): void {
  }

  tapLogin() {
    this.auth.tapLogin(this.login);
  }

}
