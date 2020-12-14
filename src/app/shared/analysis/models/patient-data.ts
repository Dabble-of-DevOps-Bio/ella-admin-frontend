import { Expose } from 'class-transformer';

export class AnalysisPatientData {
  @Expose()
  public id: number;

  constructor(model: Partial<AnalysisPatientData> = {}) {
    Object.assign(this, model);
  }
}
