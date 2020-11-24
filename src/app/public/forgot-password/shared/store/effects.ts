import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PublicForgotPasswordPageActions } from './actions';
import { PublicForgotPasswordPageSelectors } from './selectors';
import { AuthService } from '@shared/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationActions } from '@shared/notification';
import { Router } from '@angular/router';

@Injectable()
export class PublicForgotPasswordPageEffects {
  public forgotPassword$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicForgotPasswordPageActions.forgotPassword),
      withLatestFrom(
        this.store.select(PublicForgotPasswordPageSelectors.formState)
      ),
      switchMap(([_, formState]) => {
        return this.authService
          .resetPassword(formState.value.email)
          .pipe(
            map((response) => PublicForgotPasswordPageActions.forgotPasswordSuccess()),
            catchError((response: HttpErrorResponse) => [PublicForgotPasswordPageActions.forgotPasswordFailed({ response })])
          );
      })
    )
  );

  public forgotPasswordSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicForgotPasswordPageActions.forgotPasswordSuccess),
      tap(() => this.router.navigateByUrl('/login')),
      map(() => NotificationActions.showSuccess({
        translationKey: 'PUBLIC.FORGOT_PASSWORD.TEXT_SUCCESS'
      }))
    )
  );

  public forgotPasswordFailed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicForgotPasswordPageActions.forgotPasswordFailed),
      map((action) => NotificationActions.showError({
        translationKey: (action.response.error.detail !== undefined)
          ? action.response.error.detail
          : 'PUBLIC.FORGOT_PASSWORD.TEXT_ERROR'
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
