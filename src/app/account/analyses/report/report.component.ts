import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountAnalysesReportPageFacade } from './report.facade';
import { Observable } from 'rxjs';
import { AnalysisPatientData } from '@shared/analysis';
import { FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportForm } from './shared/forms';

@Component({
  selector: 'account-analyses-report-page',
  templateUrl: 'report.html',
  styleUrls: ['report.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportPageComponent implements OnDestroy {
  public isPatientLoading$: Observable<boolean>;
  public isReportLoading$: Observable<boolean>;
  public patientData$: Observable<AnalysisPatientData>;
  public reportData$: Observable<AnalysisPatientData>;
  public formState$: Observable<FormGroupState<AccountAnalysesReportForm>>;

  constructor(
    private facade: AccountAnalysesReportPageFacade
  ) {
    this.isPatientLoading$ = this.facade.isPatientLoading$;
    this.isReportLoading$ = this.facade.isReportLoading$;
    this.patientData$ = this.facade.patientData$;
    this.formState$ = this.facade.formState$;

    this.facade.initPage();
  }

  public onSubmit(): void {
    this.facade.save();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
