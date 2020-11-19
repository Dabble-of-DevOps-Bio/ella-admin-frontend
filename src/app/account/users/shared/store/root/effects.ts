import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUsersPageRootActions } from './actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PaginationRequest, PaginationResponse } from '@shared/pagination';
import { User, UserService } from '@shared/user';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountUsersPageRootEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.loadItems),
      map(() => {
        return AccountUsersPageRootActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountUsersPageRootActions.loadItemsByParameters),
      switchMap((action) => {
        return this.userService
          .search({})
          .pipe(
            map((response: PaginationResponse<User>) => AccountUsersPageRootActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountUsersPageRootActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) { }
}
