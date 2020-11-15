import { Action, createReducer, on } from '@ngrx/store';
import { UserActions } from '@shared/user';
import { onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { PublicLoginForm } from '../forms';
import { PublicLoginPageActions } from './actions';
import { PublicLoginPageState } from './state';
import { required } from 'ngrx-forms/validation';

const initialState = new PublicLoginPageState();

const reducers = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(PublicLoginPageActions.resetState, () => initialState),
    on(UserActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      errorResponse: null,
      isLoginFailed: false
    })),
    on(UserActions.loginFailure, (state, action) => ({
      ...state,
      isLoginFailed: true,
      isSubmitting: false
    }))
  ),
  (state) => state.formState,
  updateGroup<PublicLoginForm>({
    username: validate<string>(required),
    password: validate<string>(required)
  })
);

export function publicLoginPageReducer(state: PublicLoginPageState | undefined, action: Action): PublicLoginPageState {
  return reducers(state, action);
}
