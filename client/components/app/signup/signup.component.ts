import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/login.service';


@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  //styleUrls: ['signup.component.css']
})
export class SignUpComponent {
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
    this.authService.postSignUp(user)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



