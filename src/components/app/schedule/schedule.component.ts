import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { PageService } from '../services/page.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'schedule.component.html',
  styles: [ ]
})
  
export class ScheduleComponent {
  time: string;
  activities: any;
  userProfile: any;
  petProfile: any;

  constructor(
    private router: Router,
    private pageService: PageService
  ) { }

  onSelect(): void {
    const time = this.time;
    console.log(time);
    this.pageService.getActivities(time)
      .then(activities => {
        //console.log('yep fired', activities);
        this.activities = activities;
        console.log(this.activities)
      })
  }
  onSelectActivity(activity): void {
    const email = activity.email_user;
    console.log(email);
    this.pageService.getDashboard(email)
      .then(information => {
        this.userProfile = information.userInfo;
        this.petProfile = information.petInfo;
        console.log(this.userProfile);
        console.log(this.petProfile);
      })
  }

}


