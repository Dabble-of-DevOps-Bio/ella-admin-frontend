import { Action, createReducer, on } from '@ngrx/store';
import { addArrayControl, onNgrxForms, removeArrayControl, setValue, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { AccountAnalysesReportForm } from '../../forms';
import { AccountAnalysesReportModalEditActions } from '../modal-edit';
import { AccountAnalysesReportPageRootActions } from './actions';
import { AccountAnalysesReportPageRootState } from './state';

const initialState = new AccountAnalysesReportPageRootState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountAnalysesReportPageRootActions.resetState, () => initialState),
    on(AccountAnalysesReportPageRootActions.initPage, (state) => ({
      ...state,
      isPatientLoading: true,
      isReportLoading: true
    })),
    on(AccountAnalysesReportPageRootActions.loadPatientDataSuccess, (state, action) => ({
      ...state,
      patientData: action.response,
      isPatientLoading: false
    })),
    on(AccountAnalysesReportPageRootActions.loadPatientDataFailure, (state) => ({
      ...state,
      isPatientLoading: false
    })),
    on(AccountAnalysesReportPageRootActions.loadVariantReportSuccess, (state, action) => ({
      ...state,
      report: action.response,
      isReportLoading: false,
      formState: updateGroup<AccountAnalysesReportForm>(state.formState, {
        literature: setValue(action.response?.literature || ''),
        comment: setValue(action.response?.comment || ''),
        data: setValue(action.response?.data || [])
      })
    })),
    on(AccountAnalysesReportPageRootActions.loadVariantReportFailure, (state) => ({
      ...state,
      isReportLoading: false
    })),
    on(AccountAnalysesReportPageRootActions.deleteItem, (state, action) => ({
      ...state,
      formState: updateGroup<AccountAnalysesReportForm>(
        state.formState,
        {
          data: removeArrayControl(action.index)
        }
      )
    })),
    on(AccountAnalysesReportModalEditActions.saveSuccess, (state, action) => ({
      ...state,
      formState: updateGroup<AccountAnalysesReportForm>(
        state.formState,
        {
          data: addArrayControl(action.result)
        }
      )
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountAnalysesReportForm>({
    literature: validate(required),
    comment: validate(required)
  })
);

export function accountAnalysesReportPageRootReducer(state: AccountAnalysesReportPageRootState | undefined, action: Action): AccountAnalysesReportPageRootState {
  return reducer(state, action);
}
