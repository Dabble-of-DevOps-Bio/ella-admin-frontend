import { Action, ActionReducerMap, combineReducers } from '@ngrx/store';
import { AccountUserGroupsPageState } from './state';
import { accountUserGroupsPageRootReducer } from './root';
import { accountUserGroupsModalDetailsReducer } from './modal-details';

const initialState = new AccountUserGroupsPageState();

const reducersMap: ActionReducerMap<AccountUserGroupsPageState> = {
  rootState: accountUserGroupsPageRootReducer,
  modalDetails: accountUserGroupsModalDetailsReducer,
};

const reducer = combineReducers(reducersMap, initialState);

export function accountUserGroupsPageReducer(state: AccountUserGroupsPageState | undefined, action: Action): AccountUserGroupsPageState {
  return reducer(state, action);
}
