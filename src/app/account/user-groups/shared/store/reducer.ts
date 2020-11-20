import { Action, createReducer, on } from '@ngrx/store';
import { AccountUserGroupsPageActions } from './actions';
import { AccountUserGroupsPageState } from './state';

const initialState = new AccountUserGroupsPageState();

const reducer = createReducer(
  initialState,
  on(AccountUserGroupsPageActions.resetState, () => initialState)
);

export function accountUserGroupsPageReducer(state: AccountUserGroupsPageState | undefined, action: Action): AccountUserGroupsPageState {
  return reducer(state, action);
}
