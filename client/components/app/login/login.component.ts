import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/login.service';


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
    private authService: AuthService
  ) { }

  onSelect(): void {
    const user = {
      email: this.email,
      password: this.password
    }
    console.log(user);
    this.authService.postLogin(user)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



