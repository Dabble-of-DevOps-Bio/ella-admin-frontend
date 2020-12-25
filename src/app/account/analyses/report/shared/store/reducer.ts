import { Action, ActionReducerMap, combineReducers } from '@ngrx/store';
import { AccountAnalysesReportPageState } from './state';
import { accountAnalysesReportPageRootReducer } from './root';
import { accountAnalysesReportModalEditReducer } from './modal-edit';

const initialState = new AccountAnalysesReportPageState();

const reducersMap: ActionReducerMap<AccountAnalysesReportPageState> = {
  rootState: accountAnalysesReportPageRootReducer,
  modalEdit: accountAnalysesReportModalEditReducer,
};

const reducer = combineReducers(reducersMap, initialState);

export function accountAnalysesReportPageReducer(state: AccountAnalysesReportPageState | undefined, action: Action): AccountAnalysesReportPageState {
  return reducer(state, action);
}
