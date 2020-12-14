import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';

export class AccountAnalysesReportPageState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public patientData: AnalysisPatientData;
  public report: AnalysisVariantReport;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.patientData = null;
    this.report = null;
  }
}
