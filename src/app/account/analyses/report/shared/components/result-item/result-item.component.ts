import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnalysisVariantResult } from '@shared/analysis';
import { FormState } from 'ngrx-forms';
import { AccountAnalysesReportPageFacade } from '../../../report.facade';

@Component({
  selector: 'analyses-report-result-item',
  templateUrl: 'result-item.html',
  styleUrls: ['result-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportResultItemComponent {
  @Input() data: FormState<AnalysisVariantResult>;
  @Input() index: number;

  constructor(
    private facade: AccountAnalysesReportPageFacade
  ) { }

  public onRemoveClick(): void {
    this.facade.openDeleteResultModal(this.index);
  }
}
