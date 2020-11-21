import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models';
import { UserActions } from './actions';
import { UserService } from '../user-group.service';
import { AuthSelectors } from '@shared/auth';

@Injectable()
export class UserEffects {
  public init$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      withLatestFrom(
        this.store.select(AuthSelectors.isAuthenticated)
      ),
      filter(([_, isAuthenticated]) => isAuthenticated),
      map(() => UserActions.refreshProfile())
    )
  );

  public refreshProfile$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.refreshProfile),
      withLatestFrom(
        this.store.select(AuthSelectors.isAuthenticated)
      ),
      filter(([_, isAuthenticated]) => isAuthenticated),
      mergeMap(() => {
        return this.userService
          .profile()
          .pipe(
            map((response: User) => UserActions.refreshProfileSuccess({ response })),
            catchError((response: HttpErrorResponse) => of(UserActions.refreshProfileFailure({ response })))
          );
      })
    )
  );

  public refreshProfileSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.refreshProfileSuccess),
      tap((action) => {
        localStorage.setItem('user_id', String(action.response.id));
        localStorage.setItem('user_first_name', action.response.firstName);
        localStorage.setItem('user_last_name', action.response.lastName);
        localStorage.setItem('user_is_super_user', String(+action.response.isSuperUser));
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>
  ) { }
}
