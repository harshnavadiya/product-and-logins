import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
// import Axios from 'axios';
// import { Common } from './common';
// import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class Auth0ServiceService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'Celiv0zfqjd56zLlYEgA5feosXKtF4jR',
    domain: 'dev-o6bx-x6x.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200',
    scope: 'openid profile'
  });

  constructor(public router:Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

userProfile: any;
// public profileservice:any={"picture":'https://cdn0.iconfinder.com/data/icons/feather/96/no-512.png'};
//...
public getProfile(cb): void {
  if (!this._accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(this._accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}
  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get getprofile(){
    return this.userProfile;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        const self=this;
        this.auth0.client.userInfo(this._accessToken, (err, profile) => {
          if (profile) {
            // localStorage.setItem('profile',JSON.stringify(profile));
            self.userProfile = profile;
            // self.userProfile = profile;
          }
          // cb(err, profile);
        });
        // this.router.navigate(['/']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    console.log(authResult);
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // localStorage.removeItem('user_id');
    // this.router.navigate(['/login']);
    this.auth0.logout({
      returnTo: window.location.origin
    });
   
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this._accessToken && Date.now() < this._expiresAt;
  }


}
