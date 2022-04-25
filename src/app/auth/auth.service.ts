import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from './user.modle';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

const SEC_2_MILISEC = 1000

//from fire base API page
export interface AuthResopnseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

//from fire base API page
const SIGN_UP_END_POINT =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

const SIGN_IN_END_POINT =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

//from fireBase->ProjectOverview->ProjectSettings->Web API key
const APP_KEY = 'AIzaSyDBnYLm-FqiLWt1igSaTVVVd4uC4e8f2Qo';

@Injectable({ providedIn: 'root' })
export class AuthService{
  user = new BehaviorSubject<User|null>(null);
  userElem:User;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResopnseData>(SIGN_UP_END_POINT + APP_KEY, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  //login
  signIn(email: string, password: string) {
    return this.http
      .post<AuthResopnseData>(SIGN_IN_END_POINT + APP_KEY, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    localStorage.removeItem('newSLItems')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  //expirationDuration in miliseconds!
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const data = localStorage.getItem('userData')
    if (!data){
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(data);
    this.userElem = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (this.userElem.token) {
      this.user.next(this.userElem);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  getUserName(){
    const email = this.userElem.email;
    const emailName = email.split('@')[0];
    const name = emailName.split(/[._]/)[0]
    const upperCased = name.charAt(0).toUpperCase() + name.slice(1);
    return upperCased+" ,id: "+this.userElem.id
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * SEC_2_MILISEC);
    this.userElem = new User(email, localId, idToken, expirationDate);
    this.user.next(this.userElem);
    this.autoLogout(expiresIn * SEC_2_MILISEC);
    //JSON.stringify(user) converts user (js object) to string..
    localStorage.setItem('userData', JSON.stringify(this.userElem));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let error = '';
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error =
          'We have blocked all requests from this device due to \
                        unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        error =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        error = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        error = 'The user account has been disabled by an administrator.';
        break;
      default:
        error = 'An error Occured.';
    }
    return throwError(error);
  }
}
