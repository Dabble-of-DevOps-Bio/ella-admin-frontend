import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountAnalysesReportForm } from '../forms';

export class AccountAnalysesReportPageState {
  public isReportLoading: boolean;
  public isPatientLoading: boolean;
  public isSendingRequest: boolean;
  public patientData: AnalysisPatientData;
  public report: AnalysisVariantReport;
  public formState: FormGroupState<AccountAnalysesReportForm>;

  constructor() {
    this.isReportLoading = false;
    this.isPatientLoading = false;
    this.isSendingRequest = false;
    this.patientData = null;
    this.report = null;
    this.formState = createFormGroupState<AccountAnalysesReportForm>('AccountAnalysesReportForm', {
      literature: '',
      comment: '',
      data: []
    });
  }
}
