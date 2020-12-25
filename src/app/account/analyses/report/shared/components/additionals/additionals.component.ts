import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportPageFacade } from '../../../report.facade';
import { AccountAnalysesReportForm } from '../../forms';

@Component({
  selector: 'analyses-report-additionals',
  templateUrl: 'additionals.html',
  styleUrls: ['additionals.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportAdditionalsComponent {
  @Input() formState: FormGroupState<AccountAnalysesReportForm>;

  constructor(
    private facade: AccountAnalysesReportPageFacade
  ) { }

  public onSubmit(): void {
    this.facade.save();
  }
}
