import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountCustomReportsReportPageActions } from './actions';
import { AccountCustomReportsReportPageSelectors } from './selectors';
import { NavigationSelectors } from '@shared/navigation';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationActions } from '@shared/notification';
import { Router } from '@angular/router';
import { CustomReport, CustomReportService } from '@shared/custom-report';

@Injectable()
export class AccountCustomReportsReportPageEffects {

  public initPage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsReportPageActions.initPage),
      withLatestFrom(
        this.store.select(NavigationSelectors.selectRouteParam('id'))
      ),
      filter(([_, id]) => !!Number(id)),
      mergeMap(([_, id]) => [
        AccountCustomReportsReportPageActions.loadData({ id: Number(id) })
      ])
    )
  );

  public loadData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsReportPageActions.loadData),
      switchMap(({ id }) => {
        return this.customReportService
          .get(id)
          .pipe(
            map((response: CustomReport) => AccountCustomReportsReportPageActions.loadDataSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountCustomReportsReportPageActions.loadDataFailure({ response })])
          );
      })
    )
  );

  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsReportPageActions.save),
      withLatestFrom(
        this.store.select(AccountCustomReportsReportPageSelectors.formState),
        this.store.select(NavigationSelectors.selectRouteParam('id'))
      ),
      filter(([_, formState]) => formState.isValid),
      switchMap(([_, formState, id]) => {
        const report = new CustomReport({});

        return this.customReportService
          .update(report)
          .pipe(
            map(() => AccountCustomReportsReportPageActions.saveSuccess()),
            catchError((response: HttpErrorResponse) => [AccountCustomReportsReportPageActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsReportPageActions.saveSuccess),
      tap(() => this.router.navigateByUrl('/analyses')),
      map(() => NotificationActions.showSuccess({
        translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
      }))
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountCustomReportsReportPageActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private customReportService: CustomReportService,
    private router: Router
  ) { }
}
