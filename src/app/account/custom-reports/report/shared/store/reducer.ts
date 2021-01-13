import { Action, createReducer, on } from '@ngrx/store';
import { onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { AccountCustomReportsReportForm } from '../forms';
import { AccountCustomReportsReportPageActions } from './actions';
import { AccountCustomReportsReportPageState } from './state';

const initialState = new AccountCustomReportsReportPageState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountCustomReportsReportPageActions.resetState, () => initialState),
    on(AccountCustomReportsReportPageActions.initPage, (state) => ({
      ...state,
      isLoading: true
    })),
    on(AccountCustomReportsReportPageActions.loadDataSuccess, (state, action) => ({
      ...state,
      customReport: action.response,
      isLoading: false
    })),
    on(AccountCustomReportsReportPageActions.loadDataFailure, (state) => ({
      ...state,
      isLoading: false
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountCustomReportsReportForm>({
    literature: validate(required),
    comment: validate(required)
  })
);

export function accountCustomReportsReportPageReducer(state: AccountCustomReportsReportPageState | undefined, action: Action): AccountCustomReportsReportPageState {
  return reducer(state, action);
}
