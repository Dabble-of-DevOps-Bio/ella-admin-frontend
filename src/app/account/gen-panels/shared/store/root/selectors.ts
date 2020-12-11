import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountGenPanelsPageRootState } from './state';
import { GenPanel } from '@shared/gen-panel';
import { find } from 'lodash';

const selectFeature = (state: AppState) => state.accountGenPanelsPage.rootState as AccountGenPanelsPageRootState;

export class AccountGenPanelsPageRootSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenPanelsPageRootState) => state.isLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenPanelsPageRootState) => state.isSendingRequest
  );

  public static items: MemoizedSelector<AppState, Array<GenPanel>> = createSelector(
    selectFeature,
    (state: AccountGenPanelsPageRootState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountGenPanelsPageRootState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, GenPanel> = createSelector(
    AccountGenPanelsPageRootSelectors.items,
    (items: Array<GenPanel>, id: number) => find(items, { id })
  );
}
