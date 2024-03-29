import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';
// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new Subject<User>();
  // user = new BehaviorSubject<User | any>(null);
  private tokenExprinationTimer: any;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  // signup(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((data) => {
  //         this.handleAuth(
  //           data.email,
  //           data.localId,
  //           data.idToken,
  //           +data.expiresIn
  //         );
  //       })
  //     );
  // }
  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //         environment.firebaseAPIKey,
  //       {
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((data) => {
  //         this.handleAuth(
  //           data.email,
  //           data.localId,
  //           data.idToken,
  //           +data.expiresIn
  //         );
  //       })
  //     );
  // }
  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData')!);

  //   if (!userData) {
  //     return;
  //   }
  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );
  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //       })
  //     );
  //     const expriationTime =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(expriationTime);
  //   }
  // }
  // logout() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if (this.tokenExprinationTimer) {
  //     clearTimeout(this.tokenExprinationTimer);
  //   }
  //   this.tokenExprinationTimer = null;
  // }
  // autoLogout(expriationDuration: number) {
  //   this.tokenExprinationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expriationDuration);
  // }
  // private handleAuth(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   let user = new User(email, userId, token, expirationDate);
  //   // this.user.next(user);
  //   this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //     email,
  //   userId,
  //   token,
  //   expirationDate
  //   }))
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }
  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'unknown error occurred!';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = ' email aleardy Exist';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'this email does not exist';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password is not correct';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }

  setLogoutTimer(expriationDuration: number) {
    this.tokenExprinationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expriationDuration);
  }
  clearLogoutTime() {
    if (this.tokenExprinationTimer) {
      clearTimeout(this.tokenExprinationTimer);
      this.tokenExprinationTimer = null;
    }
  }
}
