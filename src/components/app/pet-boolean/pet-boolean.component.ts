import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'pet-boolean',
  templateUrl: 'pet-boolean.component.html',
  //styleUrls: ['pet-boolean.component.css']
})
export class PetBooleanComponent {

  constructor(
    private router: Router,
  ) { }

  onSelectPet(): void {
    this.router.navigate(['/pet-signup']);
  }
  onSelectFriend(): void {
    this.router.navigate(['/person-signup']);
  }
}



