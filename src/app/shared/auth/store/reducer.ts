import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from './state';
import { AuthActions } from './actions';

const initialState = new AuthState();

const reducer = createReducer(
  initialState,
  on(AuthActions.updateToken, (state, action) => ({
    ...state,
    token: action.token,
    isTokenRefreshing: false
  })),
  on(AuthActions.authorizeSuccess, (state, action) => ({
    ...state,
    token: action.response.access,
    isTokenRefreshing: false
  })),
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isTokenRefreshing: true
  })),
  on(AuthActions.unauthorize, (state) => ({
    ...state,
    token: null
  }))
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
