import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountAnalysesReportPageFacade } from './report.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-analyses-report-page',
  templateUrl: 'report.html',
  styleUrls: ['report.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportPageComponent implements OnDestroy {
  public isLoading$: Observable<boolean>;

  constructor(
    private facade: AccountAnalysesReportPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;

    this.facade.initPage();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
