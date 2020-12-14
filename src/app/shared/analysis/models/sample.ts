import { Expose } from 'class-transformer';

export class AnalysisSample {
  @Expose({ name: 'sample_id' })
  public sampleID: number;

  @Expose({ name: 'sample_accession' })
  public sampleAccession: string;

  @Expose({ name: 'sample_accession_date' })
  public sampleAccessionDate: string;

  @Expose({ name: 'sample_collection_date' })
  public sampleCollectionDate: string;

  @Expose({ name: 'sample_type' })
  public sampleType: string;

  constructor(model: Partial<AnalysisSample> = {}) {
    Object.assign(this, model);
  }
}
