import { Expose } from 'class-transformer';

export class AnalysisReport {
  @Expose({ name: 'report_date' })
  public reportDate: string;

  constructor(model: Partial<AnalysisReport> = {}) {
    Object.assign(this, model);
  }
}
