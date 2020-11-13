import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PublicLoginPageActions } from './actions';
import { PublicLoginPageSelectors } from './selectors';
import { exhaustMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class PublicLoginPageEffects {
  public tryLogin$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PublicLoginPageActions.tryLogin),
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

  public authorizeSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authorizeSuccess),
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
