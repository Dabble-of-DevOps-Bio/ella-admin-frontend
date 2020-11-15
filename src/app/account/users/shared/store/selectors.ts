import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountUsersPageState } from './state';

const selectFeature = (state: AppState) => state.accountUsersPage;

export class AccountUsersPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountUsersPageState) => state.isLoading
  );
}
