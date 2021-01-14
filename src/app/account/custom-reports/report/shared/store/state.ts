import { CustomReport, CustomReportGene, CustomReportVariation } from '@shared/custom-report';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { AccountCustomReportsReportForm } from '../forms';

export class AccountCustomReportsReportPageState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public customReport: CustomReport;
  public formState: FormGroupState<AccountCustomReportsReportForm>;
  public genes: Array<CustomReportGene>;
  public variations: Array<CustomReportVariation>;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.customReport = null;
    this.genes = [];
    this.variations = [];
    this.formState = createFormGroupState<AccountCustomReportsReportForm>('AccountCustomReportsReportForm', {
      name: '',
      customReportGeneID: null,
      customReportGene: '',
      customReportVariationID: null,
      customReportVariation: '',
      result: '',
      interpretation: ''
    });
  }
}
