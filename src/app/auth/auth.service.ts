import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export const AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

interface AuthResponseData {
  idToken: string; // Firebase Auth ID token for the authenticated user
  email: string; // The email for the authenticated user
  refreshToken: string; // Firebase Auth refresh token for the authenticated user
  expiresIn: string; // Number of seconds in which the ID token expires
  localId: string; // The uid of the authenticated user
  registered: boolean; // Whether the email is for an existing account
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null>(null);
  // user = new Subject<User>();
  http = inject(HttpClient);
  router = inject(Router);
  private tokenExpirationTimer: any;

  constructor() {}

  ngOnInit() {
    console.log(this.user);
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AUTH_URL + ':signUp?key=AIzaSyDyskcQoqQHsC3V5dp1HL5KnjAt1g-I5Jw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AUTH_URL +
          ':signInWithPassword?key=AIzaSyDyskcQoqQHsC3V5dp1HL5KnjAt1g-I5Jw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  autoLogin() {
    let userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const userDetails: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(userData);
    const user = new User(
      userDetails.email,
      userDetails.id,
      userDetails._token,
      new Date(userDetails._tokenExpirationDate)
    );
    if (user.token) {
      this.user.set(user);
      let durationToExpire =
        new Date(userDetails._tokenExpirationDate).getTime() -
        new Date().getTime();
      console.log(durationToExpire);
      this.autoLogOut(durationToExpire);
    }
  }

  logOut() {
    this.user.set(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    console.log(errorResponse);
    if (errorResponse.error?.error?.message) {
      switch (errorResponse.error.error.message) {
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage =
            'Invalid login credentials passed. Try again or use sign up!';
          break;
        case 'USER_DISABLED':
          errorMessage =
            'User is disabled by the admin. Please contact support!';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already exists. Try login!';
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    // this.user.next(user);
    this.user.set(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
