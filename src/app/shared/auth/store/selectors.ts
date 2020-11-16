import { AppState } from '@shared/store';
import { AuthState } from './state';
import { createSelector, MemoizedSelector } from '@ngrx/store';

const selectFeature = (state: AppState) => state.authState;

export class AuthSelectors {
  public static token: MemoizedSelector<AppState, string> = createSelector(
    selectFeature,
    (state: AuthState) => state.token
  );

  public static isTokenRefreshing: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AuthState) => state.isTokenRefreshing
  );

  public static isAuthenticated: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: AuthState) => !!state.token
  );
}
