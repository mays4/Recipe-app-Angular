import { Action } from "@ngrx/store";

export const LOGIN='LOGIN';
export const AUTO_LOGIN='AUTO_LOGIN';
export const LOGOUT='LOGOUT';
export const AUTHENTICATIESUCCESS='AUTHENTICATIESUCCESS';
export const AUTHENTICATIEFAIL='AUTHENTICATIEFAIL';
export const SINGUP='SIGNUP';
export const CLEARERROR='CLEARERROR';


export class Login implements Action{
 readonly type =LOGIN;
 constructor(public payload:{email:string, userId:string, token:string, expirationDate:Date}){}
}
export class AutoLogin implements Action{
  readonly type =AUTO_LOGIN;
 }
export class SignUp implements Action{
  readonly type =SINGUP;
 }
 export class Logout implements Action{
  readonly type =LOGOUT;
 }
 export class AuthenticateSuccess implements Action{
  readonly type =AUTHENTICATIESUCCESS;
 }
 export class AuthenticateFail implements Action{
  readonly type =AUTHENTICATIEFAIL;
 }
 export class ClearError implements Action{
  readonly type =CLEARERROR;
 }

 export type AuthActionsType =Login | SignUp |AutoLogin | Logout | AuthenticateSuccess |AuthenticateFail |ClearError
