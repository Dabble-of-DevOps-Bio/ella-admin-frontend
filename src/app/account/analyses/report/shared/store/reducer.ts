import { Action, createReducer, on } from '@ngrx/store';
import { onNgrxForms, setValue, updateGroup, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { AccountAnalysesReportForm } from '../forms';
import { AccountAnalysesReportPageActions } from './actions';
import { AccountAnalysesReportPageState } from './state';

const initialState = new AccountAnalysesReportPageState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountAnalysesReportPageActions.resetState, () => initialState),
    on(AccountAnalysesReportPageActions.initPage, (state) => ({
      ...state,
      isPatientLoading: true,
      isReportLoading: true
    })),
    on(AccountAnalysesReportPageActions.loadPatientDataSuccess, (state, action) => ({
      ...state,
      patientData: action.response,
      isPatientLoading: false
    })),
    on(AccountAnalysesReportPageActions.loadPatientDataFailure, (state) => ({
      ...state,
      isPatientLoading: false
    })),
    on(AccountAnalysesReportPageActions.loadVariantReportSuccess, (state, action) => ({
      ...state,
      report: action.response,
      isReportLoading: false,
      formState: updateGroup<AccountAnalysesReportForm>(state.formState, {
        literature: setValue(action.response?.literature || ''),
        comment: setValue(action.response?.comment || ''),
        // data: setValue(action.user?.group.id || null)
      })
    })),
    on(AccountAnalysesReportPageActions.loadVariantReportFailure, (state) => ({
      ...state,
      isReportLoading: false
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountAnalysesReportForm>({})
);

export function accountAnalysesReportPageReducer(state: AccountAnalysesReportPageState | undefined, action: Action): AccountAnalysesReportPageState {
  return reducer(state, action);
}
