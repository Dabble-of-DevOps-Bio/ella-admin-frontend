import { Expose } from 'class-transformer';

export class AnalysisTest {
  @Expose({ name: 'test_accession' })
  public testAccession: string;

  @Expose({ name: 'test_code' })
  public testCode: string;

  @Expose({ name: 'test_indication' })
  public testIndication: string;

  @Expose({ name: 'test_ordered' })
  public testOrdered: string;

  @Expose({ name: 'test_requesting_physician' })
  public testRequestingPhysician: string;

  constructor(model: Partial<AnalysisTest> = {}) {
    Object.assign(this, model);
  }
}
