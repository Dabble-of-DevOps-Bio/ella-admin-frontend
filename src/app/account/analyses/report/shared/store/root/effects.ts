import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountAnalysesReportPageRootActions } from './actions';
import { AnalysisPatientData, AnalysisService, AnalysisVariantReport, AnalysisVariantResult } from '@shared/analysis';
import { AccountAnalysesReportPageRootSelectors } from './selectors';
import { NavigationSelectors } from '@shared/navigation';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationActions } from '@shared/notification';
import { ModalActions } from '@shared/modal';
import { Router } from '@angular/router';

@Injectable()
export class AccountAnalysesReportPageRootEffects {

  public initPage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.initPage),
      withLatestFrom(
        this.store.select(NavigationSelectors.selectRouteParam('id'))
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

  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.save),
      withLatestFrom(
        this.store.select(AccountAnalysesReportPageRootSelectors.formState),
        this.store.select(NavigationSelectors.selectRouteParam('id'))
      ),
      filter(([_, formState]) => formState.isValid),
      switchMap(([_, formState, id]) => {
        const report = new AnalysisVariantReport({
          literature: formState.value.literature,
          comment: formState.value.comment,
          data: formState.value.data.map((result) => new AnalysisVariantResult(result ))
        });

        return this.analysisService
          .updateVariantReport(Number(id), report)
          .pipe(
            map(() => AccountAnalysesReportPageRootActions.saveSuccess()),
            catchError((response: HttpErrorResponse) => [AccountAnalysesReportPageRootActions.saveFailure({ response })])
          );
      })
    )
  );

  public saveSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.saveSuccess),
      tap(() => this.router.navigateByUrl('/analyses')),
      map(() => NotificationActions.showSuccess({
        translationKey: 'SHARED.NOTIFICATIONS.TEXT_SUCCESS'
      }))
    )
  );

  public saveFailure$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportPageRootActions.saveFailure),
      map((response) => NotificationActions.showError({
        translationKey: (response.response.error.name !== undefined) ? response.response.error.name[0] : 'SHARED.NOTIFICATIONS.TEXT_ERROR'
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private analysisService: AnalysisService,
    private router: Router
  ) { }
}
