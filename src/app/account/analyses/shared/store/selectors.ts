import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountAnalysesPageState } from './state';
import { Analysis } from '@shared/analysis';
import { find } from 'lodash';

const selectFeature = (state: AppState) => state.accountAnalysesPage as AccountAnalysesPageState;

export class AccountAnalysesPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountAnalysesPageState) => state.isLoading
  );

  public static items: MemoizedSelector<AppState, Array<Analysis>> = createSelector(
    selectFeature,
    (state: AccountAnalysesPageState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountAnalysesPageState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, Analysis> = createSelector(
    AccountAnalysesPageSelectors.items,
    (items: Array<Analysis>, id: number) => find(items, { id })
  );
}
