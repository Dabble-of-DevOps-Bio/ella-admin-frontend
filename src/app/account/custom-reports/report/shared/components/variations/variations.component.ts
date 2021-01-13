import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomReport } from '@shared/custom-report';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'custom-reports-report-variations',
  templateUrl: 'variations.html',
  styleUrls: ['variations.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportVariationsComponent {
  @Input() data: CustomReport;
  @Input() formState: FormGroupState<AccountCustomReportsReportForm>;
}
