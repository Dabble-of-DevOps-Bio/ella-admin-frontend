import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, timer } from 'rxjs';
import { AccountCustomReportsReportPageActions } from './actions';
import { AccountCustomReportsReportPageSelectors } from './selectors';
import { NavigationSelectors } from '@shared/navigation';
import { catchError, debounce, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationActions } from '@shared/notification';
import { Router } from '@angular/router';
import { CustomReport, CustomReportService } from '@shared/custom-report';
import { SetValueAction } from 'ngrx-forms';
import { find } from 'lodash';

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

  public geneChange$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SetValueAction.TYPE),
      filter((action: SetValueAction<any>) => action.controlId === 'AccountCustomReportsReportForm.customReportGeneID'),
      withLatestFrom(
        this.store.select(AccountCustomReportsReportPageSelectors.genes),
      ),
      map(([{ value }, genes]) => {
        const variations = (value) ? find(genes, { id: value }).customReportVariations : [];

        return AccountCustomReportsReportPageActions.fillVariations({ variations });
      })
    )
  );

  public geneTextChange$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SetValueAction.TYPE),
      filter((action: SetValueAction<any>) => action.controlId === 'AccountCustomReportsReportForm.customReportGene'),
      debounce((action: SetValueAction<any>) => action.controlId === 'AdminArtistsFiltersForm.customReportGene' ? timer(400) : EMPTY),
      map(() => AccountCustomReportsReportPageActions.resetGenes({ value: null }))
    )
  );

  public variationChange$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SetValueAction.TYPE),
      filter((action: SetValueAction<any>) => action.controlId === 'AccountCustomReportsReportForm.customReportVariationID'),
      withLatestFrom(
        this.store.select(AccountCustomReportsReportPageSelectors.variations),
      ),
      map(([{ value }, variations]) => {
        const variation = (value) ? find(variations, { id: value }) : null;
        const result = (variation && variation.customReportResult)
          ? variation.customReportResult.result
          : '';
        const interpretation = (variation && variation.customReportResult && variation.customReportResult.customReportInterpretation)
          ? variation.customReportResult.customReportInterpretation.interpretations
          : '';

        return AccountCustomReportsReportPageActions.fillInterpretation({ result, interpretation });
      })
    )
  );

  public variationTextChange$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SetValueAction.TYPE),
      filter((action: SetValueAction<any>) => action.controlId === 'AccountCustomReportsReportForm.customReportVariation'),
      debounce((action: SetValueAction<any>) => action.controlId === 'AdminArtistsFiltersForm.customReportVariation' ? timer(400) : EMPTY),
      map(() => AccountCustomReportsReportPageActions.resetVariations({ value: null }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private customReportService: CustomReportService,
    private router: Router
  ) { }
}
