import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
const {token} = require('../../../../config/googlemaps.api')
console.log(token);

@Component({
  templateUrl: 'schedule.component.html',
  styles: [ ]
})
  
export class ScheduleComponent {
  //variable assignment to initialize the components,
  token: string = token;
  url : SafeResourceUrl;
  src: string = `https://www.google.com/maps/embed/v1/place?key=${token}&q=Bean+Gallery,NewOrleans+LA`;
  constructor(private domSanitizer: DomSanitizer) {}
  ngOnInit() {
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBfz7Y7C-7emBWPSEi925MBpeXLRcL-Jzw&q=Bean+Gallery,NewOrleans+LA");
  }

}



