import { Expose, Type } from 'class-transformer';
import { CustomReportGene } from './gene';

export class CustomReport {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public type: string;

  @Expose()
  public method: string;

  @Expose()
  public disclaimer: string;

  @Type(() => CustomReportGene)
  @Expose({ name: 'custom_report_genes' })
  public customReportGenes: Array<CustomReportGene>;

  @Expose({ name: 'custom_report_full_report' })
  public customReportFullReport: any;

  constructor(model: Partial<CustomReport> = {}) {
    Object.assign(this, model);
  }
}
