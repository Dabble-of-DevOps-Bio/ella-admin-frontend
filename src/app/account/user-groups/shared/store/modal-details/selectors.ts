import { AppState } from '@shared/store';
import { AccountUserGroupsDetailsForm } from '../../forms';
import { AccountUserGroupsModalDetailsState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';

const selectFeature = (state: AppState) => state.accountUserGroupsPage.modalDetails;

export class AccountUserGroupsModalDetailsSelectors {
  public static isSubmitting: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUserGroupsModalDetailsState) => state.isSubmitting
  );

  public static formState: MemoizedSelector<AppState, FormGroupState<AccountUserGroupsDetailsForm>> = createSelector(
    selectFeature,
    (state: AccountUserGroupsModalDetailsState) => state.formState
  );
}
