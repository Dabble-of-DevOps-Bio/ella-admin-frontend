import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './actions';
import { AuthResponse } from '../models';
import { AuthService } from '../auth.service';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserActions } from '@shared/user/store/actions';
import { AuthSelectors } from './selectors';
import { AppState } from '@shared/store';
import { ModalActions } from '@shared/modal';

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
      mergeMap((action) => {
        localStorage.setItem('token', action.response.access);
        localStorage.setItem('refresh_token', action.response.refresh);

        return [
          UserActions.refreshProfile(),
          AuthActions.clientAppAuthorize()
        ];
      })
    )
  );

  public clientAppAuthorize$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.clientAppAuthorize),
      switchMap(() => {
        return this.authService
          .clientAppAuthorize()
          .pipe(
            map(() => AuthActions.clientAppAuthorizeSuccess()),
            catchError((response: HttpErrorResponse) => of(AuthActions.clientAppAuthorizeFailure({ response })))
          );
      })
    )
  );

  public unauthorize$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.unauthorize),
      map(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_first_name');
        localStorage.removeItem('user_last_name');
        localStorage.removeItem('user_auth_group');

        this.router.navigateByUrl('/login');

        return ModalActions.closeAll();
      })
    )
  );

  public refreshToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(
        this.store.select(AuthSelectors.refreshToken)
      ),
      switchMap(([_, token]) => {
        return this.authService
          .refreshToken(token)
          .pipe(
            map(({ access }) => AuthActions.updateToken({ token: access })),
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

  public refreshTokenFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenFailure),
      map(() => AuthActions.unauthorize())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }
}
