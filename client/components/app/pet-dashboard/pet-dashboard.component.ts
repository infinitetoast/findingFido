import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'pet-dashboard',
  templateUrl: 'pet-dashboard.component.html',
  //styleUrls: ['pet-dashboard.component.css']
})
export class PetDashboardComponent {
  name: string;


  constructor(
    private router: Router,
  ) { }

  onSelect(): void {
    this.router.navigate(['/chat']);

  }
}



