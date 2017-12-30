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
    console.log(activity);

  }

  onHover(activity): void {
    console.log(activity.location);
    this.pageService.getMap(activity.location)
      .then(gps => {
        console.log(gps)
      });
  }

}


