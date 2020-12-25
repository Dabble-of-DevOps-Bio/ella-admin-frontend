import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AnalysisVariantResult } from '@shared/analysis';
import { BaseModalComponent } from '@shared/base-modal';
import { FormState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { AccountAnalysesReportModalEditFacade } from './modal-edit.facade';

@Component({
  selector: 'analyses-report-modal-edit',
  templateUrl: 'modal-edit.html',
  styleUrls: ['modal-edit.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportModalEditComponent extends BaseModalComponent implements OnDestroy {
  public formState$: Observable<FormState<AnalysisVariantResult>>;

  constructor(
    protected dialogRef: MatDialogRef<AccountAnalysesReportModalEditComponent>,
    protected facade: AccountAnalysesReportModalEditFacade
  ) {
    super(dialogRef, facade);

    this.formState$ = this.facade.formState$;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public save(): void {
    this.facade.save(this.modalID);
  }

  public close(): void {
    super.close();
  }
}
