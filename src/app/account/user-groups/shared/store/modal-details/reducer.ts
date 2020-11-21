import { Action, createReducer, on } from '@ngrx/store';
import { AccountUserGroupsModalDetailsActions } from './actions';
import { AccountUserGroupsModalDetailsState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate } from 'ngrx-forms';
import { AccountUserGroupsDetailsForm } from '../../forms';
import { email, required } from 'ngrx-forms/validation';

const initialState = new AccountUserGroupsModalDetailsState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountUserGroupsModalDetailsActions.resetState, () => initialState),
    on(AccountUserGroupsModalDetailsActions.save, (state) => ({
      ...state,
      isSubmitting: state.formState.isValid
    })),
    on(AccountUserGroupsModalDetailsActions.saveSuccess, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUserGroupsModalDetailsActions.saveFailure, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUserGroupsModalDetailsActions.prefillForm, (state, action) => ({
      ...state,
      formState: updateGroup<AccountUserGroupsDetailsForm>(state.formState, {
        name: setValue(action.userGroup?.name || ''),
        id: setValue(action.userGroup?.id || null)
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountUserGroupsDetailsForm>({
    name: validate(required)
  })
);

export function accountUserGroupsModalDetailsReducer(state: AccountUserGroupsModalDetailsState | undefined, action: Action): AccountUserGroupsModalDetailsState {
  return reducer(state, action);
}
