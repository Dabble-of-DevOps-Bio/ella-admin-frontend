import { Expose } from 'class-transformer';

export class AnalysisVariantReport {
  @Expose()
  public id: number;

  constructor(model: Partial<AnalysisVariantReport> = {}) {
    Object.assign(this, model);
  }
}
