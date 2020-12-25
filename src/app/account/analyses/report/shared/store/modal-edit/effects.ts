import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountAnalysesReportModalEditActions } from './actions';
import { withLatestFrom, filter, mergeMap } from 'rxjs/operators';
import { AccountAnalysesReportModalEditSelectors } from './selectors';
import { ModalActions } from '@shared/modal';

@Injectable()
export class AccountAnalysesReportModalEditEffects {
  public save$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountAnalysesReportModalEditActions.save),
      withLatestFrom(
        this.store.select(AccountAnalysesReportModalEditSelectors.formState)
      ),
      filter(([_, formState]) => formState.isValid),
      mergeMap(([_, formState]) => [
        AccountAnalysesReportModalEditActions.saveSuccess({ result: formState.value }),
        ModalActions.closeAll()
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }
}
