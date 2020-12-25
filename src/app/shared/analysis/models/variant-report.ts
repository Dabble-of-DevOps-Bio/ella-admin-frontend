import { Expose, Type } from 'class-transformer';
import { AnalysisVariantResult } from './variant-result';

export class AnalysisVariantReport {
  @Expose()
  public literature: string;

  @Expose()
  public comment: string;

  @Type(() => AnalysisVariantResult)
  @Expose()
  public data: Array<AnalysisVariantResult>;

  constructor(model: Partial<AnalysisVariantReport> = {}) {
    Object.assign(this, model);
  }
}
