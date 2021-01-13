import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomReport } from '@shared/custom-report';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'custom-reports-report-interpretation',
  templateUrl: 'interpretation.html',
  styleUrls: ['interpretation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportInterpretationComponent {
  @Input() data: CustomReport;
  @Input() formState: FormGroupState<AccountCustomReportsReportForm>;
}
