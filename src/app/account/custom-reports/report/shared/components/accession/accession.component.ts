import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomReport } from '@shared/custom-report';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'custom-reports-report-accession',
  templateUrl: 'accession.html',
  styleUrls: ['accession.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportAccessionComponent {
  @Input() data: CustomReport;
  @Input() formState: FormGroupState<AccountCustomReportsReportForm>;
}
