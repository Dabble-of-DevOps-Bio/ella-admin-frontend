import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountAnalysesReportPageRootActions, AccountAnalysesReportPageRootSelectors } from './shared/store';
import { AppState } from '@shared/store';
import { AnalysisPatientData } from '@shared/analysis';
import { FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportForm } from './shared/forms';
import { ModalService } from '@shared/modal';
import { AccountModalConfirmationComponent } from '@app/account/shared/modal-confirmation';
import { AccountAnalysesReportModalEditComponent } from './shared/components/modal-edit/modal-edit.component';

@Injectable()
export class AccountAnalysesReportPageFacade {
  public get formState$(): Observable<FormGroupState<AccountAnalysesReportForm>> {
    return this.store.select(AccountAnalysesReportPageRootSelectors.formState);
  }

  public get isReportLoading$(): Observable<boolean> {
    return this.store.select(AccountAnalysesReportPageRootSelectors.isReportLoading);
  }

  public get isPatientLoading$(): Observable<boolean> {
    return this.store.select(AccountAnalysesReportPageRootSelectors.isPatientLoading);
  }

  public get patientData$(): Observable<AnalysisPatientData> {
    return this.store.select(AccountAnalysesReportPageRootSelectors.patientData);
  }

  constructor(
    protected store: Store<AppState>,
    private modalService: ModalService
  ) { }

  public initPage(): void {
    this.store.dispatch(AccountAnalysesReportPageRootActions.initPage());
  }

  public resetState(): void {
    this.store.dispatch(AccountAnalysesReportPageRootActions.resetState());
  }

  public save(): void {
    this.store.dispatch(AccountAnalysesReportPageRootActions.save());
  }

  public openAddResultModal(): void {
    this.modalService.open(AccountAnalysesReportModalEditComponent, {
      panelClass: 'analyses-modal-panel'
    });
  }

  public deleteItem(modalID: string, index: number): void {
    this.store.dispatch(AccountAnalysesReportPageRootActions.deleteItem({ modalID, index }));
  }

  public openDeleteResultModal(index: number): void {
    this.modalService.open(
      AccountModalConfirmationComponent,
      {
        data: {
          action: ((modalID) => this.deleteItem(modalID, index)).bind(this),
          title: 'ACCOUNT.ANALYSES.REPORT.MODAL_DELETE.TEXT_TITLE',
          text: 'ACCOUNT.ANALYSES.REPORT.MODAL_DELETE.TEXT_MESSAGE'
        }
      }
    );
  }
}
