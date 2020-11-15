import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './actions';
import { AuthResponse } from '../models';
import { AuthService } from '../auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserActions } from '@shared/user/store/actions';

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
        localStorage.setItem('token', action.response.refresh);
        // localStorage.setItem('user_id', String(action.response.user.id));
        // localStorage.setItem('user_role_id', String(action.response.user.roleID));

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
        localStorage.removeItem('user_role_id');

        this.router.navigateByUrl('/login');
      })
    ),
    { dispatch: false }
  );

  public refreshToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() => {
        return this.authService
          .refreshToken()
          .pipe(
            map((response) => {
              const token = response.headers.get('Authorization').split(' ')[1];

              return AuthActions.updateToken({ token });
            }),
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
    private router: Router
  ) { }
}
