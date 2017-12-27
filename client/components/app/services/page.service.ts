import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private scheduleUrl = '/schedule';  
  private locationsUrl = '/locations'

  constructor(private http: Http) { }

  postSchedule(schedule: any): Promise<any> {
    return this.http
      .post(this.scheduleUrl, JSON.stringify(schedule), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getLocations(): Promise<any> {
    return this.http.get(this.locationsUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


