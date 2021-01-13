import { AnalysisPatientData, AnalysisVariantReport } from '@shared/analysis';
import { CustomReport } from '@shared/custom-report';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../forms';

export class AccountCustomReportsReportPageState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public customReport: CustomReport;
  public formState: FormGroupState<AccountCustomReportsReportForm>;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.customReport = null;
    this.formState = createFormGroupState<AccountCustomReportsReportForm>('AccountCustomReportsReportForm', {
      literature: '',
      comment: '',
      data: []
    });
  }
}
