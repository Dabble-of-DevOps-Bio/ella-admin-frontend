import { Expose, Type } from 'class-transformer';

export class GenePanel {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose({ name: 'genome_reference' })
  public genomeReference: string;

  @Expose()
  public version: string;

  @Expose()
  public official: boolean;

  @Expose()
  public groups: Array<number>;

  constructor(model: Partial<GenePanel> = {}) {
    Object.assign(this, model);
  }
}
