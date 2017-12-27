import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
const {token} = require('../../../../config/googlemaps.api')
import { PageService } from '../services/page.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'schedule.component.html',
  styles: [ ]
})
  
export class ScheduleComponent {
  //variable assignment to initialize the components,
  token: string = token;
  url : SafeResourceUrl;
  src: string = `https://www.google.com/maps/embed/v1/place?key=${token}&q=Bean+Gallery,NewOrleans+LA`;
  schedule: string;

  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
    private pageService: PageService
  ) { }
  ngOnInit() {
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
  onSelect(): void {
    const schedule = {
      schedule: this.schedule,
    }
    console.log(schedule);
    this.pageService.postSchedule(schedule)
      .then(schedule => console.log('yep fired', schedule))
    this.router.navigate(['/dashboard']);

  }

}
//Need to get the location api back from a get request getLocations form PageService


