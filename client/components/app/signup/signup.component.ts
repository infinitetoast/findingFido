import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../services/email.service';


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
    public authService: AuthService,
    private emailService: EmailService
  ) { }

  onSelect(): void {
    const user = {
      email: this.email,
      password: this.password
    }
    console.log(user);
    this.emailService.postSignUp(user)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



