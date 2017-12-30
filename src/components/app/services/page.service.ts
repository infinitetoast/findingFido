import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private photoHeaders = new Headers({ 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' });

  private reviewUrl = 'http://localhost:9000/review';  
  private chatUrl = 'http://localhost:9000/chat'
  private activitiesUrl = 'http://localhost:9000/activities'
  private dashboardUrl = 'http://localhost:9000/dashboard'
  private photosUrl = 'http://localhost:9000/photos'
  private userProfileUrl = 'http://localhost:9000/userProfile'
  private mapUrl = 'http://localhost:9000/map'

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
  postPhoto(photo: any, formData: FormData): Promise<any> {
    console.log("firrred");
    console.log(photo);
    console.log(formData);
    return this.authHttp
      //.post(this.photosUrl, JSON.stringify(photo), { headers: this.headers })
      .post(this.photosUrl, formData, { headers: this.photoHeaders })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  getPhotos(photos: any): Promise<any> {
    return this.authHttp
      .get(this.photosUrl, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  getUserProfile(userProfile: any): Promise<any> {
    return this.authHttp
      .get(this.userProfileUrl, { headers: this.headers })
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
  getDashboard(email: any): Promise<any> {
    return this.authHttp
      .get(`${this.dashboardUrl}/${email}`, { headers: this.headers })
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

  postMap(location: any): Promise<any> {
    return this.http
      .post(this.mapUrl, JSON.stringify(location), { headers: this.headers })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}


