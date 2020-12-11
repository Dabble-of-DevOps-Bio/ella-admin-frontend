import { Action, ActionReducerMap, combineReducers, createReducer, on } from '@ngrx/store';
import { accountGenPanelsPageRootReducer } from './root';
import { AccountGenPanelsPageState } from './state';

const initialState = new AccountGenPanelsPageState();

const reducersMap: ActionReducerMap<AccountGenPanelsPageState> = {
  rootState: accountGenPanelsPageRootReducer
};

const reducer = combineReducers(reducersMap, initialState);

export function accountGenPanelsPageReducer(state: AccountGenPanelsPageState | undefined, action: Action): AccountGenPanelsPageState {
  return reducer(state, action);
}
