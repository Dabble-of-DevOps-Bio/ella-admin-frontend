import { Expose, Type } from 'class-transformer';
import { CustomReportInterpretation } from './interpretation';

export class CustomReportResult {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public result: string;

  @Type(() => CustomReportInterpretation)
  @Expose({ name: 'custom_report_interpretation' })
  public customReportInterpretation: CustomReportInterpretation;

  constructor(model: Partial<CustomReportResult> = {}) {
    Object.assign(this, model);
  }
}
