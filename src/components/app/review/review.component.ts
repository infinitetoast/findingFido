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
  profile: any;
  punctuality: any;
  comments: any;
  overall: any;
  friendliness: any;


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
      profile: this.profile,
      punctuality: this.punctuality,
      comments: this.comments,
      overall: this.overall,
      friendliness: this.friendliness,
    }
    console.log(review);
    this.pageService.postReview(review)
      .then(review => console.log('yep fired', review))
    this.router.navigate(['/dashboard']);

  }
}





