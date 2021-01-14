import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountCustomReportsPageState } from './state';
import { find } from 'lodash';
import { CustomReport } from '@shared/custom-report';

const selectFeature = (state: AppState) => state.accountCustomReportsPage as AccountCustomReportsPageState;

export class AccountCustomReportsPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountCustomReportsPageState) => state.isLoading
  );

  public static items: MemoizedSelector<AppState, Array<CustomReport>> = createSelector(
    selectFeature,
    (state: AccountCustomReportsPageState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountCustomReportsPageState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, CustomReport> = createSelector(
    AccountCustomReportsPageSelectors.items,
    (items: Array<CustomReport>, id: number) => find(items, { id })
  );
}
