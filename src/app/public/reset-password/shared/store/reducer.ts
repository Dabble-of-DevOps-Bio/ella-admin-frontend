import { Action, createReducer, on } from '@ngrx/store';
import { onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { equalTo, required } from 'ngrx-forms/validation';
import { PublicResetPasswordForm } from '../forms';
import { PublicResetPasswordPageActions } from './actions';
import { PublicResetPasswordPageState } from './state';

const initialState = new PublicResetPasswordPageState();

const reducer = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(PublicResetPasswordPageActions.resetState, () => initialState),
    on(PublicResetPasswordPageActions.checkToken, (state) => ({
      ...state,
      isCheckingToken: true,
    })),
    on(PublicResetPasswordPageActions.checkTokenSuccess, (state, action) => ({
      ...state,
      isCheckingToken: false
    })),
    on(PublicResetPasswordPageActions.checkTokenFailed, (state, action) => ({
      ...state,
      isCheckingToken: false
    })),
    on(PublicResetPasswordPageActions.resetPassword, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(PublicResetPasswordPageActions.resetPasswordSuccess, (state, action) => ({
      ...state,
      isShowSuccess: true,
      isSubmitting: false
    })),
    on(PublicResetPasswordPageActions.resetPasswordFailed, (state, action) => ({
      ...state,
      isSubmitting: false
    }))
  ),
  (state) => state.formState,
  updateGroup<PublicResetPasswordForm>({
    password: validate<string>(required),
    repeatPassword: (confirm, parentGroup) => {
      return validate<string>(equalTo(parentGroup.controls.password.value))(confirm);
    }
  })
);

export function publicResetPasswordPageReducer(state: PublicResetPasswordPageState | undefined, action: Action): PublicResetPasswordPageState {
  return reducer(state, action);
}
