import { Component } from '@angular/core';
import token from '../../../../config/googlemaps.api'
console.log(token);

@Component({
  templateUrl: 'schedule.component.html',
  styles: [ ]
})
  
export class ScheduleComponent {
  token: String;
  constructor() { }


}



