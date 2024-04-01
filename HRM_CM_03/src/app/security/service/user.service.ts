/**

 Sample: coenraadf-angular-ponyracer-master
 2016 - Become a ninja with Angular 2.pdf

 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { UserModel } from '../model/user.model';
import {HttpClient} from "@angular/common/http";
//import { HttpService } from '../../http.service';


@Injectable()
export class UserService {

  public userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  /*
  register(username, password, birthYear): Observable<UserModel> {
    const body = {username, password, birthYear};
    return this.http.post('/api/users', body);
  }*/

  /*
  authenticate(credentials): Observable<UserModel> {
    window.localStorage.removeItem('currentUser');
    return this.http
        //.post('/api/users/authentication', credentials)
        .post('/auth/login', credentials)

        //do(Observable): Perform a side effect for every emission on the source Observable,
        // but return an Observable that is identical to the source.
        //http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
        //.do() is to execute code for each event. A difference to .map() is, that the return value of
        // .do() is ignored and doesn't change what value the subscriber receives.
        .do((user) =>{
            window.localStorage.setItem('token', user.token);
            window.localStorage.setItem('refreshToken', user.refreshToken);
            this.storeLoggedInUser(user.username)
            });


  }*/

  /**
   * used to refresh the token when it expires
   * @returns {Observable<any>}
   */
  refreshToken(): Observable<any> {

    const value = window.localStorage.getItem('currentUser');

    return this.http.post('/api/auth/token', value)
     // .flatMap(()=>this.authHttp.get(''))
      .map(
        (response: Response) => {
          return response.json();
        },
        (error: Response) => {
          console.log(error);
        }
      );
  }

  storeLoggedInUser(userName) {
    let user: UserModel = new UserModel({username:userName})
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser() {
    const value = window.localStorage.getItem('currentUser');
    if (value) {
      const user = JSON.parse(value);
      this.userEvents.next(user);
    }
  }

  logout() {
    this.userEvents.next(null);
    window.localStorage.removeItem('currentUser');
  }
}
