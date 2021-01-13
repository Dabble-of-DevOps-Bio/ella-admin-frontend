import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportPageFacade } from '../../../report.facade';
import { AccountCustomReportsReportForm } from '../../forms';

@Component({
  selector: 'analyses-report-additionals',
  templateUrl: 'additionals.html',
  styleUrls: ['additionals.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsReportAdditionalsComponent {
  @Input() formState: FormGroupState<AccountCustomReportsReportForm>;

  constructor(
    private facade: AccountCustomReportsReportPageFacade
  ) { }

  public onSubmit(): void {
    this.facade.save();
  }
}
