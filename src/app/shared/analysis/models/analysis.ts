import { DateTransformer } from '@shared/date-transformer';
import { Expose, Type, Transform } from 'class-transformer';

export class Analysis {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose({ name: 'gene_panel_name' })
  public genePanelName: string;

  @Expose({ name: 'gene_panel_version' })
  public genePanelVersion: string;

  @Expose()
  public warnings: boolean;

  @Expose()
  public report: string;

  @Transform(DateTransformer)
  @Expose({ name: 'date_deposited' })
  public dateDeposited: Date;

  @Transform(DateTransformer)
  @Expose({ name: 'date_requested' })
  public dateRequested: Date;

  constructor(model: Partial<Analysis> = {}) {
    Object.assign(this, model);
  }
}
