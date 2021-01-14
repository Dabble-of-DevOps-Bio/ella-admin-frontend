import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountCustomReportsReportPageActions, AccountCustomReportsReportPageSelectors } from './shared/store';
import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from './shared/forms';
import { CustomReport } from '@shared/custom-report';
import { CustomSelectOption } from '@shared/custom-select';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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

  public get geneOptions$(): Observable<Array<CustomSelectOption<number>>> {
    return this.store
      .select(AccountCustomReportsReportPageSelectors.genes)
      .pipe(
        map((genes) => {
          const options = [];

          options.push(
            new CustomSelectOption({
              id: null,
              title: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.REPORT.TEXT_SELECT_FROM_AVAILABLE')
            })
          );

          return [...options, ...genes.map((item) => {
            return new CustomSelectOption({
              id: item.id,
              title: item.name
            });
          })];
        })
      );
  }

  public get variationOptions$(): Observable<Array<CustomSelectOption<number>>> {
    return this.store
      .select(AccountCustomReportsReportPageSelectors.variations)
      .pipe(
        map((variations) => {
          const options = [];

          options.push(
            new CustomSelectOption({
              id: null,
              title: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.REPORT.TEXT_SELECT_FROM_AVAILABLE')
            })
          );

          return [...options, ...variations.map((item) => {
            return new CustomSelectOption({
              id: item.id,
              title: item.variation
            });
          })];
        })
      );
  }

  constructor(
    protected store: Store<AppState>,
    private translateService: TranslateService
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
