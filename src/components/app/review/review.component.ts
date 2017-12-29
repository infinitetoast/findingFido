import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';


@Component({
  selector: 'review',
  templateUrl: 'review.component.html',
  //styleUrls: ['review.component.css']
})
export class ReviewComponent implements OnInit{
  name: string;
  profile: any;


  constructor(
    private router: Router,
    public authService: AuthService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  onSelect(): void {
    const review = {
      
    }
    this.router.navigate(['/dashboard']);

  }
}



