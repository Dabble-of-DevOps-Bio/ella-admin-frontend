import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PublicLoginPageState } from './state';

const selectFeature = (state: AppState) => state.publicLoginPage;

export class PublicLoginPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicLoginPageState) => state.isLoading
  );
}
