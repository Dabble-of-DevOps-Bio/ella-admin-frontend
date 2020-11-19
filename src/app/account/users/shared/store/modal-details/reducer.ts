import { Action, createReducer, on } from '@ngrx/store';
import { AccountUsersModalDetailsActions } from './actions';
import { AccountUsersModalDetailsState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate } from 'ngrx-forms';
import { AccountUsersDetailsForm } from '../../forms';
import { required } from 'ngrx-forms/validation';

const initialState = new AccountUsersModalDetailsState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountUsersModalDetailsActions.resetState, () => initialState),
    on(AccountUsersModalDetailsActions.update, (state) => ({
      ...state,
      isSubmitting: state.formState.isValid
    })),
    on(AccountUsersModalDetailsActions.updateSuccess, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUsersModalDetailsActions.updateFailure, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUsersModalDetailsActions.prefillForm, (state, action) => ({
      ...state,
      formState: updateGroup<AccountUsersDetailsForm>(state.formState, {
        firstName: setValue(action.profile.firstName),
        lastName: setValue(action.profile.lastName),
        email: setValue(action.profile.email)
      })
    }))
  ),
  (state) => state.formState,
  updateGroup<AccountUsersDetailsForm>({
    firstName: validate(required),
    lastName: validate(required)
  })
);

export function accountUsersModalDetailsReducer(state: AccountUsersModalDetailsState | undefined, action: Action): AccountUsersModalDetailsState {
  return reducer(state, action);
}
