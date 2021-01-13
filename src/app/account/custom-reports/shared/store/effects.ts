import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountCustomReportsPageActions } from './actions';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@shared/pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomReport, CustomReportService } from '@shared/custom-report';

@Injectable()
export class AccountCustomReportsPageEffects {
  public loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsPageActions.loadItems),
      map(() => {
        return AccountCustomReportsPageActions.loadItemsByParameters({});
      })
    )
  );

  public loadItemsByParameters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsPageActions.loadItemsByParameters),
      switchMap(() => {
        return this.customReportService
          .search({ all: true })
          .pipe(
            map((response: PaginationResponse<CustomReport>) => AccountCustomReportsPageActions.loadItemsSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountCustomReportsPageActions.loadItemsFailure({ response })])
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private customReportService: CustomReportService
  ) { }
}
