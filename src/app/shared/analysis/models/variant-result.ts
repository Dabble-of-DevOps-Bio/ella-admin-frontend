import { Expose } from 'class-transformer';

export class AnalysisVariantResult {
  @Expose()
  public gene: string;

  @Expose()
  public variant: string;

  @Expose()
  public zygosity: string;

  @Expose({ name: 'variant_classification' })
  public variantClassification: string;

  constructor(model: Partial<AnalysisVariantResult> = {}) {
    Object.assign(this, model);
  }
}
