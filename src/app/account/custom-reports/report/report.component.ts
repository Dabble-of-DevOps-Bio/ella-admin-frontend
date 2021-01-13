import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountCustomReportsReportPageFacade } from './report.facade';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from './shared/forms';
import { CustomReport } from '@shared/custom-report';

@Component({
  selector: 'account-analyses-report-page',
  templateUrl: 'report.html',
  styleUrls: ['report.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportPageComponent implements OnDestroy {
  public isLoading$: Observable<boolean>;
  public customReport$: Observable<CustomReport>;
  public formState$: Observable<FormGroupState<AccountCustomReportsReportForm>>;

  constructor(
    private facade: AccountCustomReportsReportPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
    this.customReport$ = this.facade.customReport$;
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
