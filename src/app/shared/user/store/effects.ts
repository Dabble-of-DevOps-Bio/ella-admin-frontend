import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse, User } from '../models';
import { UserActions } from './actions';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  /*public init$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      withLatestFrom(
        this.store.select(AuthSelectors.isAuthenticated)
      ),
      filter(([_, isAuthenticated]) => isAuthenticated),
      map(() => UserActions.refreshProfile())
    )
  );*/

  public login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap((action) => {
        return this.userService
          .login(action.credentials)
          .pipe(
            map((response: LoginResponse) => UserActions.loginSuccess({ response })),
            catchError((response: HttpErrorResponse) => of(UserActions.loginFailure({ response })))
          );
      })
    )
  );

  public loginSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      map((action) => {
        localStorage.setItem('token', action.response.token);
        localStorage.setItem('user_id', String(action.response.user.id));
        // localStorage.setItem('user_role_id', String(action.response.user.roleID));

        return UserActions.refreshProfile();
      })
    )
  );

  public logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role_id');

        this.router.navigateByUrl('/login');
      })
    ),
    { dispatch: false }
  );

  /*public refreshProfile$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.refreshProfile),
      withLatestFrom(
        this.store.select(AuthSelectors.isAuthenticated)
      ),
      filter(([_, isAuthenticated]) => isAuthenticated),
      mergeMap(() => {
        return this.userService
          .profile({ relations: ['photo'] })
          .pipe(
            map((response: User) => UserActions.refreshProfileSuccess({ response })),
            catchError((response: HttpErrorResponse) => of(UserActions.refreshProfileFailure({ response })))
          );
      })
    )
  );*/

  /*public refreshProfileSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.refreshProfileSuccess),
      tap((action) => {
        localStorage.setItem('user_id', String(action.response.id));
        localStorage.setItem('user_role_id', String(action.response.roleID));
      })
    ),
    { dispatch: false }
  );*/

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) { }
}
