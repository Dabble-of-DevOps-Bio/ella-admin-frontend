import { Expose, Type } from 'class-transformer';

export class CustomReportInterpretation {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public interpretations: string;

  constructor(model: Partial<CustomReportInterpretation> = {}) {
    Object.assign(this, model);
  }
}
