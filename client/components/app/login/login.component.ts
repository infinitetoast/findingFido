import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { AuthService } from '../auth/auth.service';


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
    private emailService: EmailService,
    public authService: AuthService
  ) { }

  login() {
    this.authService.login();
  }

  onSelect(): void {
    const user = {
      email: this.email,
      password: this.password
    }
    console.log(user);
    this.emailService.postLogin(user)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



