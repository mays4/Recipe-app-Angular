import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATIESUCCESS = '[Auth] Login Success';
export const AUTHENTICATIEFAIL = '[Auth] login Fail';
export const SINGUP = '[Auth] SignUp';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATIESUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect:boolean;
    }
  ) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export class SignUp implements Action {
  readonly type = SINGUP;
  constructor(public payload: { email: string; password: string }) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATIEFAIL;
  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActionsType =
  | SignUp
  | AutoLogin
  | Logout
  | AuthenticateSuccess
  | AuthenticateFail
  | ClearError
  | LoginStart;
