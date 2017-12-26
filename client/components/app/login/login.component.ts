import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  //styleUrls: ['login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  onSelect(): void {
    const user = {
      email: this.email,
      password: this.password
    }
    console.log(user);
    this.loginService.postLogin(user)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



