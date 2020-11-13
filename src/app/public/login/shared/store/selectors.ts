import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PublicLoginPageState } from './state';
import { FormGroupState } from 'ngrx-forms';
import { PublicLoginForm } from '../forms';

const selectFeature = (state: AppState) => state.publicLoginPage;

export class PublicLoginPageSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicLoginPageState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<PublicLoginForm>> = createSelector(
    selectFeature,
    (state: PublicLoginPageState) => state.formState
  );

  public static isLoginFailed: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicLoginPageState) => state.isLoginFailed
  );
}
