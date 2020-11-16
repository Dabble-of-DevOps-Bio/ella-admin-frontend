import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from '@shared/auth';
import { User } from '../models';
import { UserActions } from './actions';
import { UserState } from './state';

const initialState = new UserState();

const reducer = createReducer(
  initialState,
  on(UserActions.refreshProfileSuccess, (state, action) => ({
    ...state,
    profile: action.response
  })),
  on(AuthActions.unauthorize, (state) => ({
    ...state,
    profile: new User(),
    isProfileLoaded: false
  }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return reducer(state, action);
}
