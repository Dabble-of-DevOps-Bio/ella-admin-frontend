import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AuthService } from '@shared/auth';
import { PublicResetPasswordPageActions } from './actions';
import { PublicResetPasswordPageSelectors } from './selectors';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationActions } from '@shared/notification';
import { Router } from '@angular/router';
import { NavigationSelectors } from '@shared/navigation';

@Injectable()
export class PublicResetPasswordPageEffects {
  public resetPassword$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicResetPasswordPageActions.resetPassword),
      withLatestFrom(
        this.store.select(PublicResetPasswordPageSelectors.formState),
        this.store.select(NavigationSelectors.selectQueryParam('token'))
      ),
      switchMap(([_, formState, token]) => {
        return this.authService
          .setNewPassword(formState.value.password, token)
          .pipe(
            map((response) => PublicResetPasswordPageActions.resetPasswordSuccess()),
            catchError((response: HttpErrorResponse) => [PublicResetPasswordPageActions.resetPasswordFailed({ response })])
          );
      })
    )
  );

  public resetPasswordSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicResetPasswordPageActions.resetPasswordSuccess),
      tap(() => this.router.navigateByUrl('/login')),
      map(() => NotificationActions.showSuccess({
        translationKey: 'PUBLIC.RESET_PASSWORD.TEXT_SUCCESS'
      }))
    )
  );

  public resetPasswordFailed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicResetPasswordPageActions.resetPasswordFailed),
      map((action) => NotificationActions.showError({
        translationKey: (action.response.error.password !== undefined)
          ? action.response.error.password.join('\n')
          : 'PUBLIC.RESET_PASSWORD.TEXT_ERROR'
      }))
    )
  );

  public checkToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicResetPasswordPageActions.checkToken),
      withLatestFrom(
        this.store.select(NavigationSelectors.selectQueryParam('token'))
      ),
      switchMap(([_, token]) => {
        return this.authService
          .checkRestoreToken(token)
          .pipe(
            map((response) => PublicResetPasswordPageActions.checkTokenSuccess()),
            catchError((response: HttpErrorResponse) => [PublicResetPasswordPageActions.checkTokenFailed({ response })])
          );
      })
    )
  );

  public checkTokenFailed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicResetPasswordPageActions.checkTokenFailed),
      tap(() => this.router.navigateByUrl('/login')),
      map(() => NotificationActions.showError({
        translationKey: 'PUBLIC.RESET_PASSWORD.TEXT_ERROR_TOKEN'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) { }
}
