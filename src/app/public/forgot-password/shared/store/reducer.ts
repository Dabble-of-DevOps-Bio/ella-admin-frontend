import { Action, createReducer, on } from '@ngrx/store';
import { onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { email, required } from 'ngrx-forms/validation';
import { PublicForgotPasswordForm } from '../forms';
import { PublicForgotPasswordPageActions } from './actions';
import { PublicForgotPasswordPageState } from './state';

const initialState = new PublicForgotPasswordPageState();

const reducers = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(PublicForgotPasswordPageActions.resetState, () => initialState),
    on(PublicForgotPasswordPageActions.forgotPassword, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(PublicForgotPasswordPageActions.forgotPasswordSuccess, (state, action) => ({
      ...state,
      isShowSuccess: true,
      isSubmitting: false
    })),
    on(PublicForgotPasswordPageActions.forgotPasswordFailed, (state, action) => ({
      ...state,
      isSubmitting: false
    }))
  ),
  (state) => state.formState,
  updateGroup<PublicForgotPasswordForm>({
    email: validate<string>(required, email)
  })
);

export function publicForgotPasswordPageReducer(state: PublicForgotPasswordPageState | undefined, action: Action): PublicForgotPasswordPageState {
  return reducers(state, action);
}
