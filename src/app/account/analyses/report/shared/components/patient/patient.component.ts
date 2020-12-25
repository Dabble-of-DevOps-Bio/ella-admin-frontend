import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnalysisPatientData } from '@shared/analysis';

@Component({
  selector: 'analyses-report-patient',
  templateUrl: 'patient.html',
  styleUrls: ['patient.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesReportPatientComponent {
  @Input() data: AnalysisPatientData;
}
