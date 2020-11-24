import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PublicForgotPasswordPageState } from './state';
import { FormGroupState } from 'ngrx-forms';
import { PublicForgotPasswordForm } from '../forms';

const selectFeature = (state: AppState) => state.publicForgotPasswordPage;

export class PublicForgotPasswordPageSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicForgotPasswordPageState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<PublicForgotPasswordForm>> = createSelector(
    selectFeature,
    (state: PublicForgotPasswordPageState) => state.formState
  );

  public static isShowSuccess: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicForgotPasswordPageState) => state.isShowSuccess
  );
}
