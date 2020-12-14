import { Expose } from 'class-transformer';

export class AnalysisPatient {
  @Expose({ name: 'patient_dob' })
  public patientDOB: string;

  @Expose({ name: 'patient_first_name' })
  public patientFirstName: string;

  @Expose({ name: 'patient_last_name' })
  public patientLastName: string;

  @Expose({ name: 'patient_gender' })
  public patientGender: string;

  constructor(model: Partial<AnalysisPatient> = {}) {
    Object.assign(this, model);
  }
}
