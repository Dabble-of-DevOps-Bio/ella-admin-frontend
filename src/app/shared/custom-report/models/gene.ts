import { Expose, Type } from 'class-transformer';
import { CustomReportVariation } from './variation';

export class CustomReportGene {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Type(() => CustomReportVariation)
  @Expose({ name: 'custom_report_variations' })
  public customReportVariations: Array<CustomReportVariation>;

  constructor(model: Partial<CustomReportGene> = {}) {
    Object.assign(this, model);
  }
}
