import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormState } from 'ngrx-forms';
import { AccountCustomReportsReportPageFacade } from '../../../report.facade';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'analyses-report-result-items',
  templateUrl: 'result-items.html',
  styleUrls: ['result-items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportResultItemsComponent {
  @Input() formState: FormState<AccountCustomReportsReportForm>;

  constructor(
    private facade: AccountCustomReportsReportPageFacade
  ) { }

  public onAddClick(): void {
    this.facade.openAddResultModal();
  }
}
