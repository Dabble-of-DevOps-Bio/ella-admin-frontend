import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountProfilePageState } from './state';

const selectFeature = (state: AppState) => state.accountProfilePage;

export class AccountProfilePageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountProfilePageState) => state.isLoading
  );
}
