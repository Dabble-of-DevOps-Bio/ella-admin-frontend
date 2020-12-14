import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountAnalysesReportPageActions } from './actions';
import { AnalysisPatientData, AnalysisService, AnalysisVariantReport } from '@shared/analysis';
import { AccountAnalysesReportPageSelectors } from './selectors';
import { NavigationSelectors } from '@shared/navigation';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountAnalysesReportPageEffects {

  public initPage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageActions.initPage),
      withLatestFrom(
        this.store.select(NavigationSelectors.selectRouteParam('id')),
      ),
      filter(([_, id]) => !!Number(id)),
      mergeMap(([_, id]) => [
        AccountAnalysesReportPageActions.loadPatientData({ id: Number(id) }),
        AccountAnalysesReportPageActions.loadVariantReport({ id: Number(id) })
      ])
    )
  );

  public loadPatientData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageActions.loadPatientData),
      switchMap(({ id }) => {
        return this.analysisService
          .getPatientData(id)
          .pipe(
            map((response: AnalysisPatientData) => AccountAnalysesReportPageActions.loadPatientDataSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountAnalysesReportPageActions.loadPatientDataFailure({ response })])
          );
      })
    )
  );

  public loadVariantReport$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageActions.loadVariantReport),
      switchMap(({ id }) => {
        return this.analysisService
          .getVariantReport(id)
          .pipe(
            map((response: AnalysisVariantReport) => AccountAnalysesReportPageActions.loadVariantReportSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountAnalysesReportPageActions.loadVariantReportFailure({ response })])
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
