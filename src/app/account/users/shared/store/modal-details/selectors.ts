import { AppState } from '@shared/store';
import { AccountUsersDetailsForm } from '../../forms';
import { AccountUsersModalDetailsState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';

const selectFeature = (state: AppState) => state.accountUsersPage.modalDetails;

export class AccountUsersModalDetailsSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUsersModalDetailsState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountUsersDetailsForm>> = createSelector(
    selectFeature,
    (state: AccountUsersModalDetailsState) => state.formState
  );
}
