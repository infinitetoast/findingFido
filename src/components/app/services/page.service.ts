import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private reviewUrl = 'http://localhost:9000/review';  
  private chatUrl = 'http://localhost:9000/chat'
  private activitiesUrl = 'http://localhost:9000/activities'
  private dashboardUrl = 'http://localhost:9000/petDashboard'
  private photosUrl = 'http://localhost:9000/photos'

  constructor(
    private http: Http,
    public authHttp: AuthHttp
  ) { }

  postReview(review: any): Promise<any> {
    return this.authHttp
      .post(this.reviewUrl, JSON.stringify(review), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  postChat(chat: any): Promise<any> {
    return this.authHttp
      .post(this.chatUrl, JSON.stringify(chat), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  postPhotos(photos: any): Promise<any> {
    return this.authHttp
      .post(this.photosUrl, JSON.stringify(photos), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  postDashboard(dashboard: any): Promise<any> {
    return this.authHttp
      .post(this.dashboardUrl, JSON.stringify(dashboard), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  postActivities(activities: any): Promise<any> {
    return this.authHttp
      .post(this.activitiesUrl, JSON.stringify(activities), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  getActivities(time: any): Promise<any> {
    return this.authHttp
      .get(`${this.activitiesUrl}/${time}`, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


