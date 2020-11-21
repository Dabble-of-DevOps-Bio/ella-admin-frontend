import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountUserGroupsPageRootActions } from './actions';
import { UserGroup, UserGroupService } from '@shared/user-group';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalActions } from '@shared/modal';
import { NotificationActions } from '@shared/notification';

@Injectable()
export class AccountUserGroupsPageRootEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.loadItems),
      map(() => {
        return AccountUserGroupsPageRootActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.loadItemsByParameters),
      switchMap((action) => {
        return this.userGroupService
          .search({})
          .pipe(
            map((response: PaginationResponse<UserGroup>) => AccountUserGroupsPageRootActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountUserGroupsPageRootActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  public deleteUserGroup$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.deleteUserGroup),
      switchMap(({ id, modalID }) => {
        return this.userGroupService
          .delete(id)
          .pipe(
            mergeMap((response) => [
              AccountUserGroupsPageRootActions.deleteUserGroupSuccess(),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll()
            ]),
            catchError((response: HttpErrorResponse) => [AccountUserGroupsPageRootActions.deleteUserGroupFailure({ response })])
          );
      })
    )
  );

  public deleteUserGroupSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.deleteUserGroupSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountUserGroupsPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public deleteUserGroupFailed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUserGroupsPageRootActions.deleteUserGroupFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userGroupService: UserGroupService
  ) { }
}
