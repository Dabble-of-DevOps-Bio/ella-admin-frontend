import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountCustomReportsReportPageActions, AccountCustomReportsReportPageSelectors } from './shared/store';
import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from './shared/forms';
import { CustomReport } from '@shared/custom-report';

@Injectable()
export class AccountCustomReportsReportPageFacade {
  public get formState$(): Observable<FormGroupState<AccountCustomReportsReportForm>> {
    return this.store.select(AccountCustomReportsReportPageSelectors.formState);
  }

  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountCustomReportsReportPageSelectors.isLoading);
  }

  public get customReport$(): Observable<CustomReport> {
    return this.store.select(AccountCustomReportsReportPageSelectors.customReport);
  }

  constructor(
    protected store: Store<AppState>
  ) { }

  public initPage(): void {
    this.store.dispatch(AccountCustomReportsReportPageActions.initPage());
  }

  public resetState(): void {
    this.store.dispatch(AccountCustomReportsReportPageActions.resetState());
  }

  public save(): void {
    this.store.dispatch(AccountCustomReportsReportPageActions.save());
  }
}
