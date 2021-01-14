import { Expose, Type } from 'class-transformer';
import { CustomReportResult } from './result';

export class CustomReportVariation {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public variation: string;

  @Type(() => CustomReportResult)
  @Expose({ name: 'custom_report_result' })
  public customReportResult: CustomReportResult;

  constructor(model: Partial<CustomReportVariation> = {}) {
    Object.assign(this, model);
  }
}
