import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { PageService } from '../services/page.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  // styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  userInfo: any;
  petInfo: any;
  activities: any;
  photos: any;

  constructor(
    public authService: AuthService,
    private pageService: PageService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        console.log(profile.email)
        this.pageService.getUserProfile(profile.email)
        .then(information => {
          this.userInfo = information.userInfo;
          this.petInfo = information.petInfo;
          this.photos = information.photos;
          console.log('yep fired', information)
        })
      });
    }
  }

  onDelete(): void {
    this.emailService.deleteProfile(this.profile)
      .then(res => console.log('yep fired', res))
  }
  onUpdate(): void {
    this.emailService.putProfile(this.profile)
      .then(res => console.log('yep fired', res))
  }

}
