import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountCustomReportsReportPageFacade } from './report.facade';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from './shared/forms';
import { CustomReport } from '@shared/custom-report';
import { CustomSelectOption } from '@shared/custom-select';

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
  public Options$: Observable<CustomSelectOption<number>>;
  public geneOptions$: Observable<Array<CustomSelectOption<number>>>;
  public variationOptions$: Observable<Array<CustomSelectOption<number>>>;

  constructor(
    private facade: AccountCustomReportsReportPageFacade
  ) {
    this.isLoading$ = this.facade.isLoading$;
    this.customReport$ = this.facade.customReport$;
    this.formState$ = this.facade.formState$;
    this.geneOptions$ = this.facade.geneOptions$;
    this.variationOptions$ = this.facade.variationOptions$;

    this.facade.initPage();
  }

  public onSubmit(): void {
    this.facade.save();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
