import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import {UserService} from "../../security/service/user.service";
import { environment } from '../../environments/environment';

interface AccessData {
  accessToken: string;
  refreshToken: string;
  username: string;
}

@Injectable()
export class AuthenticationService implements AuthService {

  baseUrl: string = environment.backend.baseURL;

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage,
              private userService: UserService
  ) {
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage
      .getAccessToken()
      .map(token => !!token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<AccessData> {
    return this.tokenStorage
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        // return this.http.post(`http://localhost:8085/refresh`, { refreshToken });
        return this.http.post(`${this.baseUrl}` + '/auth/token', null,

          {
            headers: new HttpHeaders().set('X-Authorization', 'Bearer ' + refreshToken),
          });

      })
      .do(this.saveAccessData.bind(this))
      .catch((err) => {
        this.logout();

        return Observable.throw(err);
      });
  }

  public getHeaders(token) {
    // let theHeaders: { [name: string]: string | string[] };

   const theHeaders = {
                      'X-Authorization': 'Bearer ' + token
                      };
  return theHeaders;
}
  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/auth/token');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(credentials): Observable<any> {
    // return this.http.post(`http://localhost:3000/login`, { })
    return this.http.post(`http://localhost:4201/api/auth/login`, credentials, {
      headers: new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
    })
    .do((tokens: AccessData) => this.saveAccessData(tokens));
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    location.reload(true);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ accessToken, refreshToken, username }: AccessData) {
    this.tokenStorage
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken);
    this.userService.storeLoggedInUser(username);
  }

}
