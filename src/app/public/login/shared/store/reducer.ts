import { Action, createReducer, on } from '@ngrx/store';
import { onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { PublicLoginForm } from '../forms';
import { PublicLoginPageActions } from './actions';
import { PublicLoginPageState } from './state';
import { required } from 'ngrx-forms/validation';
import { AuthActions } from '@shared/auth';

const initialState = new PublicLoginPageState();

const reducers = wrapReducerWithFormStateUpdate(
  createReducer(
    initialState,
    onNgrxForms(),
    on(PublicLoginPageActions.resetState, () => initialState),
    on(AuthActions.authorize, (state) => ({
      ...state,
      isSubmitting: true,
      errorResponse: null,
      isLoginFailed: false
    })),
    on(AuthActions.authorizeFailure, (state, action) => ({
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
