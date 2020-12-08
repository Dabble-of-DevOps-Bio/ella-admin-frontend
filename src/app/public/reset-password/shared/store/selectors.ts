import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PublicResetPasswordPageState } from './state';
import { FormGroupState } from 'ngrx-forms';
import { PublicResetPasswordForm } from '../forms';

const selectFeature = (state: AppState) => state.publicResetPasswordPage;

export class PublicResetPasswordPageSelectors {
  public static isCheckingToken: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicResetPasswordPageState) => state.isCheckingToken
  );

  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicResetPasswordPageState) => state.isSubmitting
  );

  public static isShowSuccess: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicResetPasswordPageState) => state.isShowSuccess
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<PublicResetPasswordForm>> = createSelector(
    selectFeature,
    (state: PublicResetPasswordPageState) => state.formState
  );
}
