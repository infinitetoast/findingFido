import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'person-signup',
  templateUrl: 'person-signup.component.html',
  //styleUrls: ['person-signup.component.css']
})
export class PersonComponent {
  name: string;
  address: string;
  extra: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSelect(): void {
    const personInfo = {
      name: this.name,
      address: this.address,
      extra: this.extra
    }
    console.log(personInfo);
    this.authService.postPersonSignUp(personInfo)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



