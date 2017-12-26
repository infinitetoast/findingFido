import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  //styleUrls: ['login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private router: Router) { }

  onSelect(): void {
    const user = {
      email: this.email,
      password: this.password
    }
    console.log(user);
    this.router.navigate(['/dashboard']);

  }
}



