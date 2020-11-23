import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUsersPageRootActions } from './actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { User, UserService } from '@shared/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@shared/auth';
import { ModalActions } from '@shared/modal';
import { NotificationActions } from '@shared/notification';

@Injectable()
export class AccountUsersPageRootEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.loadItems),
      map(() => {
        return AccountUsersPageRootActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.loadItemsByParameters),
      switchMap((action) => {
        return this.userService
          .search({ relations: ['group'], all: true })
          .pipe(
            map((response: PaginationResponse<User>) => AccountUsersPageRootActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountUsersPageRootActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  public resetPassword$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.resetPassword),
      switchMap(({ email, modalID }) => {
        return this.authService
          .resetPassword(email)
          .pipe(
            mergeMap((response) => [
              AccountUsersPageRootActions.resetPasswordSuccess(),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll()
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersPageRootActions.resetPasswordFailure({ response })])
          );
      })
    )
  );

  public resetPasswordSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.resetPasswordSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountUsersPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public resetPasswordFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.resetPasswordFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private authService: AuthService
  ) { }
}
