import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PublicChangePasswordPageState } from './state';

const selectFeature = (state: AppState) => state.publicChangePasswordPage;

export class PublicChangePasswordPageSelectors {
  public static isLoading: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: PublicChangePasswordPageState) => state.isLoading
  );
}
