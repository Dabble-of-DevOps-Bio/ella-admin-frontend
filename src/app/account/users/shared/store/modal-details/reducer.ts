import { Action, createReducer, on } from '@ngrx/store';
import { AccountUsersModalDetailsActions } from './actions';
import { AccountUsersModalDetailsState } from './state';
import { onNgrxForms, updateGroup, wrapReducerWithFormStateUpdate, setValue, validate } from 'ngrx-forms';
import { AccountUsersDetailsForm } from '../../forms';
import { email, required } from 'ngrx-forms/validation';

const initialState = new AccountUsersModalDetailsState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(AccountUsersModalDetailsActions.resetState, () => initialState),
    on(AccountUsersModalDetailsActions.save, (state) => ({
      ...state,
      isSubmitting: state.formState.isValid
    })),
    on(AccountUsersModalDetailsActions.saveSuccess, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUsersModalDetailsActions.saveFailure, (state) => ({
      ...state,
      isSubmitting: false
    })),
    on(AccountUsersModalDetailsActions.prefillForm, (state, action) => ({
      ...state,
      formState: updateGroup<AccountUsersDetailsForm>(state.formState, {
        firstName: setValue(action.user?.firstName || ''),
        lastName: setValue(action.user?.lastName || ''),
        username: setValue(action.user?.username || ''),
        email: setValue(action.user?.email || ''),
        id: setValue(action.user?.id || null),
        authGroup: setValue(action.user?.authGroup || 1),
        group: setValue(action.user?.group.id || null)
      })
    })),
    on(AccountUsersModalDetailsActions.loadGroupsSuccess, (state, action) => ({
      ...state,
      groupItems: action.response.items
    })),
  ),
  (state) => state.formState,
  updateGroup<AccountUsersDetailsForm>({
    firstName: validate(required),
    lastName: validate(required),
    username: validate(required),
    email: validate(required, email),
    group: validate(required)
  })
);

export function accountUsersModalDetailsReducer(state: AccountUsersModalDetailsState | undefined, action: Action): AccountUsersModalDetailsState {
  return reducer(state, action);
}
