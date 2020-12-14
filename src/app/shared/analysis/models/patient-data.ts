import { Expose, Type } from 'class-transformer';
import { AnalysisPatient } from './patient';
import { AnalysisReport } from './report';
import { AnalysisSample } from './sample';
import { AnalysisTest } from './test';

export class AnalysisPatientData {
  @Expose({ name: 'sample_name' })
  public sampleName: string;

  @Type(() => AnalysisPatient)
  @Expose({ name: 'patient_data' })
  public patient: AnalysisPatient;

  @Type(() => AnalysisSample)
  @Expose({ name: 'sample_data' })
  public sample: AnalysisSample;

  @Type(() => AnalysisReport)
  @Expose({ name: 'report_data' })
  public report: AnalysisReport;

  @Type(() => AnalysisTest)
  @Expose({ name: 'test_data' })
  public test: AnalysisTest;

  constructor(model: Partial<AnalysisPatientData> = {}) {
    Object.assign(this, model);
  }
}
