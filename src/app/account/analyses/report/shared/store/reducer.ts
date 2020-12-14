import { Action, createReducer, on } from '@ngrx/store';
import { AccountAnalysesReportPageActions } from './actions';
import { AccountAnalysesReportPageState } from './state';

const initialState = new AccountAnalysesReportPageState();

const reducer = createReducer(
  initialState,
  on(AccountAnalysesReportPageActions.resetState, () => initialState),
  on(AccountAnalysesReportPageActions.initPage, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AccountAnalysesReportPageActions.loadPatientDataSuccess, (state, action) => ({
    ...state,
    patientData: action.response,
    isLoading: false
  })),
  on(AccountAnalysesReportPageActions.loadPatientDataFailure, (state) => ({
    ...state,
    isLoading: false
  }))
);

export function accountAnalysesReportPageReducer(state: AccountAnalysesReportPageState | undefined, action: Action): AccountAnalysesReportPageState {
  return reducer(state, action);
}
