import { Action, ActionReducerMap, combineReducers } from '@ngrx/store';
import { AccountUsersPageState } from './state';
import { accountUsersPageRootReducer } from './root';
import { accountUsersModalDetailsReducer } from './modal-details';
import { accountUsersModalPasswordReducer } from './modal-password';

const initialState = new AccountUsersPageState();

const reducersMap: ActionReducerMap<AccountUsersPageState> = {
  rootState: accountUsersPageRootReducer,
  modalDetails: accountUsersModalDetailsReducer,
  modalPassword: accountUsersModalPasswordReducer,
};

const reducer = combineReducers(reducersMap, initialState);

export function accountUsersPageReducer(state: AccountUsersPageState | undefined, action: Action): AccountUsersPageState {
  return reducer(state, action);
}
