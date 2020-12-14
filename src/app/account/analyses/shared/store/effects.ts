import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountAnalysesPageActions } from './actions';
import { Observable } from 'rxjs';
import { Analysis, AnalysisService } from '@shared/analysis';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountAnalysesPageEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesPageActions.loadItems),
      map(() => {
        return AccountAnalysesPageActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesPageActions.loadItemsByParameters),
      switchMap((action) => {
        return this.analysisService
          .search({ all: true })
          .pipe(
            map((response: PaginationResponse<Analysis>) => AccountAnalysesPageActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountAnalysesPageActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private analysisService: AnalysisService
  ) { }
}
