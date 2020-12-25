import { Action, createReducer, on } from '@ngrx/store';
import { AccountAnalysesReportModalEditActions } from './actions';
import { AccountAnalysesReportModalEditState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate } from 'ngrx-forms';
import { email, required } from 'ngrx-forms/validation';
import { AccountAnalysesResultForm } from '../../forms';

const initialState = new AccountAnalysesReportModalEditState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountAnalysesReportModalEditActions.resetState, () => initialState),
    on(AccountAnalysesReportModalEditActions.prefillForm, (state, action) => ({
      ...state,
      formState: updateGroup<AccountAnalysesResultForm>(state.formState, {
        gene: setValue(action.result?.gene || ''),
        zygosity: setValue(action.result?.zygosity || ''),
        variant: setValue(action.result?.variant || ''),
        variantClassification: setValue(action.result?.variantClassification || '')
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountAnalysesResultForm>({
    gene: validate(required),
    zygosity: validate(required),
    variant: validate(required, email),
    variantClassification: validate(required)
  })
);

export function accountAnalysesReportModalEditReducer(state: AccountAnalysesReportModalEditState | undefined, action: Action): AccountAnalysesReportModalEditState {
  return reducer(state, action);
}
