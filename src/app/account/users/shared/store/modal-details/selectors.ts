import { AppState } from '@shared/store';
import { AccountUsersDetailsForm } from '../../forms';
import { AccountUsersModalDetailsState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { UserGroup } from '@shared/user-group';

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

  public static groupItems: MemoizedSelector<AppState, Array<UserGroup>> = createSelector(
    selectFeature,
    (state: AccountUsersModalDetailsState) => state.groupItems
  );
}
