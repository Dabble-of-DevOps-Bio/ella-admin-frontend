import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './actions';
import { AuthResponse } from '../models';
import { AuthService } from '../auth.service';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserActions } from '@shared/user/store/actions';
import { AuthSelectors } from './selectors';
import { AppState } from '@shared/store';

@Injectable()
export class AuthEffects {
  public authorize$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authorize),
      switchMap((action) => {
        return this.authService
          .authorize(action.credentials)
          .pipe(
            map((response: AuthResponse) => AuthActions.authorizeSuccess({ response })),
            catchError((response: HttpErrorResponse) => of(AuthActions.authorizeFailure({ response })))
          );
      })
    )
  );

  public authorizeSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authorizeSuccess),
      map((action) => {
        localStorage.setItem('token', action.response.access);

        return UserActions.refreshProfile();
      })
    )
  );

  public unauthorize$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.unauthorize),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_first_name');
        localStorage.removeItem('user_last_name');
        localStorage.removeItem('user_is_super_user');

        this.router.navigateByUrl('/login');
      })
    ),
    { dispatch: false }
  );

  public refreshToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(
        this.store.select(AuthSelectors.token)
      ),
      switchMap(([_, token]) => {
        return this.authService
          .refreshToken(token)
          .pipe(
            map(({ refresh }) => AuthActions.updateToken({ token: refresh })),
            catchError((response: HttpErrorResponse) => of(AuthActions.refreshTokenFailure({ response })))
          );
      })
    )
  );

  public updateToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateToken),
      tap((action) => {
        localStorage.setItem('token', action.token);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }
}
