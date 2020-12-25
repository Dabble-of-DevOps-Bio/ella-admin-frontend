import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormState } from 'ngrx-forms';
import { AccountAnalysesReportPageFacade } from '../../../report.facade';
import { AccountAnalysesReportForm } from '../../forms';

@Component({
  selector: 'analyses-report-result-items',
  templateUrl: 'result-items.html',
  styleUrls: ['result-items.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportResultItemsComponent {
  @Input() formState: FormState<AccountAnalysesReportForm>;

  constructor(
    private facade: AccountAnalysesReportPageFacade
  ) { }

  public onAddClick(): void {
    this.facade.openAddResultModal();
  }
}
