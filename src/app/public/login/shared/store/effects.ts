import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { PublicLoginPageActions } from './actions';
import { PublicLoginPageSelectors } from './selectors';
import { exhaustMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginCredentials, UserActions } from '@shared/user';

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
          const credentials = new LoginCredentials(formState.value);

          return [UserActions.login({ credentials })];
        }

        return EMPTY;
      })
    )
  );

  public authorizeSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      tap(() => this.router.navigateByUrl('/dashboard'))
    ), {
      dispatch: false
    }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) { }
}
