import { AppState } from '@shared/store';
import { AccountUsersPasswordForm } from '../../forms';
import { AccountUsersModalPasswordState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';

const selectFeature = (state: AppState) => state.accountUsersPage.modalPassword;

export class AccountUsersModalPasswordSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUsersModalPasswordState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountUsersPasswordForm>> = createSelector(
    selectFeature,
    (state: AccountUsersModalPasswordState) => state.formState
  );
}
