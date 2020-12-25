import { AnalysisVariantResult } from '@shared/analysis';
import { Boxed } from 'ngrx-forms';

export class AccountAnalysesReportForm {
  public literature: string;
  public comment: string;
  public data: Array<AnalysisVariantResult>;
}
