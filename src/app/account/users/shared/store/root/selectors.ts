import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountUsersPageRootState } from './state';
import { User } from '@shared/user';
import { find } from 'lodash';

const selectFeature = (state: AppState) => state.accountUsersPage.rootState;

export class AccountUsersPageRootSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUsersPageRootState) => state.isLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUsersPageRootState) => state.isSendingRequest
  );

  public static items: MemoizedSelector<AppState, Array<User>> = createSelector(
    selectFeature,
    (state: AccountUsersPageRootState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountUsersPageRootState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, User> = createSelector(
    AccountUsersPageRootSelectors.items,
    (items: Array<User>, id: number) => find(items, { id })
  );
}
