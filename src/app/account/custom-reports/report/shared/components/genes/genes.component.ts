import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomReport } from '@shared/custom-report';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'custom-reports-report-genes',
  templateUrl: 'genes.html',
  styleUrls: ['genes.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportGenesComponent {
  @Input() data: CustomReport;
  @Input() formState: FormGroupState<AccountCustomReportsReportForm>;
}
