import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AccountGenePanelsPageRootActions } from './actions';
import { Observable } from 'rxjs';
import { GenePanel, GenePanelService } from '@shared/gene-panel';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountGenePanelsPageRootEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsPageRootActions.loadItems),
      map(() => {
        return AccountGenePanelsPageRootActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountGenePanelsPageRootActions.loadItemsByParameters),
      switchMap((action) => {
        return this.genPanelService
          .search({ all: true })
          .pipe(
            map((response: PaginationResponse<GenePanel>) => AccountGenePanelsPageRootActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountGenePanelsPageRootActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private genPanelService: GenePanelService
  ) { }
}
