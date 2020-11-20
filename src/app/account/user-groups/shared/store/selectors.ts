import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountUserGroupsPageState } from './state';

const selectFeature = (state: AppState) => state.accountUserGroupsPage;

export class AccountUserGroupsPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUserGroupsPageState) => state.isLoading
  );
}
