import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUsersModalPasswordActions } from './actions';
import { withLatestFrom, filter, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AccountUsersModalPasswordSelectors } from './selectors';
import { UserService, UpdateUserRequest } from '@shared/user';
import { ModalActions } from '@shared/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUsersPageRootActions } from '../root';
import { NotificationActions } from '@shared/notification';

@Injectable()
export class AccountUsersModalPasswordEffects {
  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalPasswordActions.save),
      withLatestFrom(
        this.store.select(AccountUsersModalPasswordSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      switchMap(([{ modalID }, formState]) => {
        const updateRequest = new UpdateUserRequest({ ...formState.value });

        return this.userService
          .update(updateRequest)
          .pipe(
            mergeMap((response) => [
              AccountUsersModalPasswordActions.saveSuccess({ response }),
              ModalActions.changeDisableClose({ modalID, isDisableClose: false }),
              ModalActions.closeAll(),
            ]),
            catchError((response: HttpErrorResponse) => [AccountUsersModalPasswordActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalPasswordActions.saveSuccess),
      mergeMap(() => [
        NotificationActions.showSuccess({
          translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
        }),
        AccountUsersPageRootActions.loadItemsByParameters({}),
      ])
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersModalPasswordActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) { }
}
