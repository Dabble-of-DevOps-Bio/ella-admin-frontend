import { Action, createReducer, on } from '@ngrx/store';
import { AccountUsersPageActions } from './actions';
import { AccountUsersPageState } from './state';

const initialState = new AccountUsersPageState();

const reducer = createReducer(
  initialState,
  on(AccountUsersPageActions.resetState, () => initialState)
);

export function accountUsersPageReducer(state: AccountUsersPageState | undefined, action: Action): AccountUsersPageState {
  return reducer(state, action);
}
