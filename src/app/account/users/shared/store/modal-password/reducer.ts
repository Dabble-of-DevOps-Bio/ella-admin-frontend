import { Action, createReducer, on } from '@ngrx/store';
import { AccountUsersModalPasswordActions } from './actions';
import { AccountUsersModalPasswordState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate } from 'ngrx-forms';
import { AccountUsersPasswordForm } from '../../forms';
import { required } from 'ngrx-forms/validation';

const initialState = new AccountUsersModalPasswordState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountUsersModalPasswordActions.resetState, () => initialState),
    on(AccountUsersModalPasswordActions.save, (state) => ({
      ...state,
      isSubmitting: state.formState.isValid
    })),
    on(AccountUsersModalPasswordActions.saveSuccess, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUsersModalPasswordActions.saveFailure, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUsersModalPasswordActions.initModal, (state, action) => ({
      ...state,
      formState: updateGroup<AccountUsersPasswordForm>(state.formState, {
        newPassword: setValue(''),
        id: setValue(action.id)
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountUsersPasswordForm>({
    newPassword: validate(required)
  })
);

export function accountUsersModalPasswordReducer(state: AccountUsersModalPasswordState | undefined, action: Action): AccountUsersModalPasswordState {
  return reducer(state, action);
}
