import { Action, createReducer, on } from '@ngrx/store';
import { AccountProfilePageActions } from './actions';
import { AccountProfilePageState } from './state';

const initialState = new AccountProfilePageState();

const reducer = createReducer(
  initialState,
  on(AccountProfilePageActions.resetState, () => initialState)
);

export function accountProfilePageReducer(state: AccountProfilePageState | undefined, action: Action): AccountProfilePageState {
  return reducer(state, action);
}
