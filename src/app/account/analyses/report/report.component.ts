import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountAnalysesReportPageFacade } from './report.facade';
import { Observable } from 'rxjs';
import { AnalysisPatientData } from '@shared/analysis';

@Component({
  selector: 'account-analyses-report-page',
  templateUrl: 'report.html',
  styleUrls: ['report.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportPageComponent implements OnDestroy {
  public isLoading$: Observable<boolean>;
  public patientData$: Observable<AnalysisPatientData>;

  constructor(
    private facade: AccountAnalysesReportPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
    this.patientData$ = this.facade.patientData$;

    this.facade.initPage();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
