import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountAnalysesReportPageRootActions } from './actions';
import { AnalysisPatientData, AnalysisService, AnalysisVariantReport } from '@shared/analysis';
import { AccountAnalysesReportPageRootSelectors } from './selectors';
import { NavigationSelectors } from '@shared/navigation';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationActions } from '@shared/notification';
import { ModalActions } from '@shared/modal';

@Injectable()
export class AccountAnalysesReportPageRootEffects {

  public initPage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.initPage),
      withLatestFrom(
        this.store.select(NavigationSelectors.selectRouteParam('id')),
      ),
      filter(([_, id]) => !!Number(id)),
      mergeMap(([_, id]) => [
        AccountAnalysesReportPageRootActions.loadPatientData({ id: Number(id) }),
        AccountAnalysesReportPageRootActions.loadVariantReport({ id: Number(id) })
      ])
    )
  );

  public loadPatientData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.loadPatientData),
      switchMap(({ id }) => {
        return this.analysisService
          .getPatientData(id)
          .pipe(
            map((response: AnalysisPatientData) => AccountAnalysesReportPageRootActions.loadPatientDataSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountAnalysesReportPageRootActions.loadPatientDataFailure({ response })])
          );
      })
    )
  );

  public loadVariantReport$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.loadVariantReport),
      switchMap(({ id }) => {
        return this.analysisService
          .getVariantReport(id)
          .pipe(
            map((response: AnalysisVariantReport) => AccountAnalysesReportPageRootActions.loadVariantReportSuccess({ response })),
            catchError((response: HttpErrorResponse) => [AccountAnalysesReportPageRootActions.loadVariantReportFailure({ response })])
          );
      })
    )
  );

  public deleteItem$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.deleteItem),
      map(() => ModalActions.closeAll())
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private analysisService: AnalysisService
  ) { }
}
