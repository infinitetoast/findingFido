import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'pet-signup',
  templateUrl: 'pet-signup.component.html',
  //styleUrls: ['pet-signup.component.css']
})
export class PetComponent {
  kind: string;
  petName: string;
  place: string;
  petInfo: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSelect(): void {
    const pet = {
      kind: this.kind,
      petName: this.petName,
      place: this.place,
      petInfo: this.petInfo,
    }
    console.log(pet);
    this.authService.postPetSignUp(pet)
    .then(user => console.log('yep fired',user))
    this.router.navigate(['/dashboard']);

  }
}



