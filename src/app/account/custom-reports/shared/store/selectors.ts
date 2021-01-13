import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountCustomReportsPageState } from './state';
import { Analysis } from '@shared/analysis';
import { find } from 'lodash';

const selectFeature = (state: AppState) => state.accountCustomReportsPage as AccountCustomReportsPageState;

export class AccountCustomReportsPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountCustomReportsPageState) => state.isLoading
  );

  public static items: MemoizedSelector<AppState, Array<Analysis>> = createSelector(
    selectFeature,
    (state: AccountCustomReportsPageState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountCustomReportsPageState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, Analysis> = createSelector(
    AccountCustomReportsPageSelectors.items,
    (items: Array<Analysis>, id: number) => find(items, { id })
  );
}
