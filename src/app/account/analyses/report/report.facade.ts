import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountAnalysesReportPageActions, AccountAnalysesReportPageSelectors } from './shared/store';
import { AppState } from '@shared/store';

@Injectable()
export class AccountAnalysesReportPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountAnalysesReportPageSelectors.isLoading);
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
}
