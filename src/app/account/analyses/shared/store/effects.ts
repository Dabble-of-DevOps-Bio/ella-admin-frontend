import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AccountAnalysesPageActions } from './actions';
import { Observable } from 'rxjs';
import { Analysis, AnalysisFilters, AnalysisService } from '@shared/analysis';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSelectors } from '@shared/user';

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
      withLatestFrom(
        this.store.select(UserSelectors.profile),
      ),
      switchMap(([_, { id }]) => {
        const filters = new AnalysisFilters({ onlyFinalized: true, userID: id });

        return this.analysisService
          .search({ all: true, filters })
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
