import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../models';
import { UserState } from './state';

const selectFeature = (state: AppState) => state.userState;

export class UserSelectors {
  public static profile: MemoizedSelector<AppState, User> = createSelector(
    selectFeature,
    (state: UserState) => state.profile
  );

  public static language: MemoizedSelector<AppState, string> = createSelector(
    selectFeature,
    (state: UserState) => state.language
  );

  public static isStaff: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: UserState) => state.profile?.isStaff
  );

  public static isSuperUser: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: UserState) => state.profile?.isSuperUser
  );
}
