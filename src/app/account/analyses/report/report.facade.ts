import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountAnalysesReportPageActions, AccountAnalysesReportPageSelectors } from './shared/store';
import { AppState } from '@shared/store';
import { AnalysisPatientData } from '@shared/analysis';
import { FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportForm } from './shared/forms';

@Injectable()
export class AccountAnalysesReportPageFacade {
  public get formState$(): Observable<FormGroupState<AccountAnalysesReportForm>> {
    return this.store.select(AccountAnalysesReportPageSelectors.formState);
  }

  public get isReportLoading$(): Observable<boolean> {
    return this.store.select(AccountAnalysesReportPageSelectors.isReportLoading);
  }

  public get isPatientLoading$(): Observable<boolean> {
    return this.store.select(AccountAnalysesReportPageSelectors.isPatientLoading);
  }

  public get patientData$(): Observable<AnalysisPatientData> {
    return this.store.select(AccountAnalysesReportPageSelectors.patientData);
  }

  constructor(
    private store: Store<AppState>
  ) { }

  public initPage(): void {
    this.store.dispatch(AccountAnalysesReportPageActions.initPage());
  }

  public resetState(): void {
    this.store.dispatch(AccountAnalysesReportPageActions.resetState());
  }

  public save(): void {
    this.store.dispatch(AccountAnalysesReportPageActions.save());
  }
}
