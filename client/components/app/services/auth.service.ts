/*@Injectable()
class MyService() {}
Declares that a class has dependencies that should be injected into the constructor 
when the dependency injector is creating an instance of this class.*/

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Note the Angular http.get returns an RxJS Observable.
// Observables are a powerful way to manage asynchronous data flows.
// We are converting the Observable to a Promise using the toPromise operator thru rxjs.
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private loginUrl = '/login';  
  private signupUrl = '/signup';
  private personUrl = '/personSignup';
  private petUrl = '/petSignup';

  constructor(private http: Http) { }

  postLogin(user: any): Promise<any> {
    return this.http
      .post(this.loginUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  postSignUp(user: any): Promise<any> {
    return this.http
      .post(this.signupUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  postPersonSignUp(user: any): Promise<any> {
    return this.http
      .post(this.personUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  postPetSignUp(user: any): Promise<any> {
    return this.http
      .post(this.petUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



