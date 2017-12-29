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

  constructor(
    private router: Router,
    private pageService: PageService
  ) { }

  onSelect(): void {
    const time = this.time;
    console.log(time);
    this.pageService.getActivities(time)
      .then(activities => console.log('yep fired', activities))

  }

}


