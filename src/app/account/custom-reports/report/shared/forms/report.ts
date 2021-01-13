import { AnalysisVariantResult } from '@shared/analysis';
import { Boxed } from 'ngrx-forms';

export class AccountCustomReportsReportForm {
  public literature: string;
  public comment: string;
  public data: Array<AnalysisVariantResult>;
}
