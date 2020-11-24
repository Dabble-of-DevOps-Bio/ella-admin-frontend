import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { PublicLoginPageActions } from './actions';
import { PublicLoginPageSelectors } from './selectors';
import { exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationActions } from '@shared/notification';
import { AuthActions, AuthCredentials } from '@shared/auth';

@Injectable()
export class PublicLoginPageEffects {
  public login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicLoginPageActions.login),
      withLatestFrom(
        this.store.select(PublicLoginPageSelectors.formState)
      ),
      exhaustMap(([_, formState]) => {
        if (formState.isValid) {
          const credentials = new AuthCredentials(formState.value);

          return [AuthActions.authorize({ credentials })];
        }

        return EMPTY;
      })
    )
  );

  public loginSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authorizeSuccess),
      tap(() => this.router.navigateByUrl('/users'))
    ), {
      dispatch: false
    }
  );

  public loginFailed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authorizeFailure),
      map((action) => NotificationActions.showError({
        translationKey: (action.response.error.detail !== undefined)
          ? action.response.error.detail
          : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) { }
}
