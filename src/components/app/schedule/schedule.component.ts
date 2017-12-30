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
  activity: any;

  constructor(
    private router: Router,
    private pageService: PageService
  ) { }

  onSelect(): void {
    const time = this.time;
    this.pageService.getActivities(time)
      .then(activities => {
        this.activities = activities;
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
  onHover(activity): void {
    let location = activity.location;
    console.log(location);
    this.pageService.postMap(activity)
      .then(gps => {
        console.log(gps)
      });
  }

}


