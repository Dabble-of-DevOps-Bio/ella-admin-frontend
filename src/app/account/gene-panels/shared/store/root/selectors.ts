import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { AccountGenePanelsPageRootState } from './state';
import { GenePanel } from '@shared/gene-panel';
import { find } from 'lodash';

const selectFeature = (state: AppState) => state.accountGenePanelsPage.rootState as AccountGenePanelsPageRootState;

export class AccountGenePanelsPageRootSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenePanelsPageRootState) => state.isLoading
  );

  public static isSendingRequest: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AccountGenePanelsPageRootState) => state.isSendingRequest
  );

  public static items: MemoizedSelector<AppState, Array<GenePanel>> = createSelector(
    selectFeature,
    (state: AccountGenePanelsPageRootState) => state.items
  );

  public static totalItems: MemoizedSelector<AppState, number> = createSelector(
    selectFeature,
    (state: AccountGenePanelsPageRootState) => state.totalItems
  );

  public static item: MemoizedSelectorWithProps<AppState, number, GenePanel> = createSelector(
    AccountGenePanelsPageRootSelectors.items,
    (items: Array<GenePanel>, id: number) => find(items, { id })
  );
}
