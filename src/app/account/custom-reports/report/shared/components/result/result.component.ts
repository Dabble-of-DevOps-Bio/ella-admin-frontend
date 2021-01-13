import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomReport } from '@shared/custom-report';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'custom-reports-report-result',
  templateUrl: 'result.html',
  styleUrls: ['result.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportResultComponent {
  @Input() data: CustomReport;
  @Input() formState: FormGroupState<AccountCustomReportsReportForm>;
}
