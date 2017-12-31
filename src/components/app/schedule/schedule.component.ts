import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { PageService } from '../services/page.service';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';


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
  lat: number = 51.678418;
  lng: number = 7.809007;

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
        this.router.navigate(['/pet-dashboard', this.petProfile.id]);

      })
  }
  onHover(activity): void {
    this.pageService.postMap(activity)
      .then(gps => {
        this.lat = gps.lat;
        this.lng = gps.lng;
      });
  }
  buildGoogleSrc(): string {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBfz7Y7C-7emBWPSEi925MBpeXLRcL-Jzw&${this.lat},${this.lng}` 
  }
}

"https://www.google.com/maps/embed/v1/place?key=AIzaSyBfz7Y7C-7emBWPSEi925MBpeXLRcL-Jzw&q=Bean+Gallery,NewOrleans+LA" 

