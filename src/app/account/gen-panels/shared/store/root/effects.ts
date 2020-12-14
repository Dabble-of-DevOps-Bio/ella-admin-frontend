import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AccountGenPanelsPageRootActions } from './actions';
import { Observable } from 'rxjs';
import { GenPanel, GenPanelService } from '@shared/gen-panel';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountGenPanelsPageRootEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsPageRootActions.loadItems),
      map(() => {
        return AccountGenPanelsPageRootActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenPanelsPageRootActions.loadItemsByParameters),
      switchMap((action) => {
        return this.genPanelService
          .search({ all: true })
          .pipe(
            map((response: PaginationResponse<GenPanel>) => AccountGenPanelsPageRootActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountGenPanelsPageRootActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private genPanelService: GenPanelService
  ) { }
}
