import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | any;
  authError: string | null;
  loading: boolean;
}
const intitState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = intitState,
  action: AuthActions.AuthActionsType
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATIESUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SINGUP:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATIEFAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
