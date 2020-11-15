import { AppState } from '@shared/store';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../models';
import { UserRoleEnum } from '../enums';
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

  public static isAdministrator: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: UserState) => true// state.profile?.roleID === UserRoleEnum.SUPER_ADMIN || state.profile?.roleID === UserRoleEnum.ADMIN
  );

  public static isSuperAdministrator: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: UserState) => true// state.profile?.roleID === UserRoleEnum.SUPER_ADMIN
  );

  public static isAuthenticated: MemoizedSelector<AppState, boolean> = createSelector(
    selectFeature,
    (state: UserState) => !!state.token
  );

  public static token: MemoizedSelector<AppState, string> = createSelector(
    selectFeature,
    (state: UserState) => state.token
  );
}
