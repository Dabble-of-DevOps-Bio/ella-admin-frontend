import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountUserGroupsPageRootState } from './state';
import { UserGroup } from '@shared/user-group';
import { find } from 'lodash';

const selectFeature = (state: AppState) => state.accountUserGroupsPage.rootState;

export class AccountUserGroupsPageRootSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUserGroupsPageRootState) => state.isLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUserGroupsPageRootState) => state.isSendingRequest
  );

  public static items: MemoizedSelector<AppState, Array<UserGroup>> = createSelector(
    selectFeature,
    (state: AccountUserGroupsPageRootState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountUserGroupsPageRootState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, UserGroup> = createSelector(
    AccountUserGroupsPageRootSelectors.items,
    (items: Array<UserGroup>, id: number) => find(items, { id })
  );
}
