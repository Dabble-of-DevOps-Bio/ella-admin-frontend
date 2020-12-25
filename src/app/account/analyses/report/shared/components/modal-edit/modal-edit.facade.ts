import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { BaseModalFacade } from '@shared/base-modal';
import { AccountAnalysesResultForm } from '../../forms';
import { AccountAnalysesReportModalEditActions, AccountAnalysesReportModalEditSelectors } from '../../store';

@Injectable()
export class AccountAnalysesReportModalEditFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountAnalysesResultForm>> {
    return this.store.select(AccountAnalysesReportModalEditSelectors.formState);
  }

  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountAnalysesReportModalEditActions.resetState());
  }

  public save(modalID: string): void {
    this.store.dispatch(AccountAnalysesReportModalEditActions.save({ modalID }));
  }
}
