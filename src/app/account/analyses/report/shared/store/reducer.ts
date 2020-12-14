import { Action, createReducer, on } from '@ngrx/store';
import { AccountAnalysesReportPageActions } from './actions';
import { AccountAnalysesReportPageState } from './state';

const initialState = new AccountAnalysesReportPageState();

const reducer = createReducer(
  initialState,
  on(AccountAnalysesReportPageActions.resetState, () => initialState)
);

export function accountAnalysesReportPageReducer(state: AccountAnalysesReportPageState | undefined, action: Action): AccountAnalysesReportPageState {
  return reducer(state, action);
}
