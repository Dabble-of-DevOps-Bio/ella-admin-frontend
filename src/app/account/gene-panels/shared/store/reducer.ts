import { Action, ActionReducerMap, combineReducers, createReducer, on } from '@ngrx/store';
import { accountGenePanelsModalDetailsReducer } from './modal-details';
import { accountGenePanelsPageRootReducer } from './root';
import { AccountGenePanelsPageState } from './state';

const initialState = new AccountGenePanelsPageState();

const reducersMap: ActionReducerMap<AccountGenePanelsPageState> = {
  rootState: accountGenePanelsPageRootReducer,
  modalDetails: accountGenePanelsModalDetailsReducer
};

const reducer = combineReducers(reducersMap, initialState);

export function accountGenePanelsPageReducer(state: AccountGenePanelsPageState | undefined, action: Action): AccountGenePanelsPageState {
  return reducer(state, action);
}
