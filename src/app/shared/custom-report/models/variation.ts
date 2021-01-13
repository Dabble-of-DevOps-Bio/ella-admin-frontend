import { Expose, Type } from 'class-transformer';

export class CustomReportVariation {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public variation: string;

  @Expose({ name: 'custom_report_result' })
  public customReportResult: any;

  constructor(model: Partial<CustomReportVariation> = {}) {
    Object.assign(this, model);
  }
}
