import { Expose, Exclude } from 'class-transformer';

export class PaginationRequest {
  @Expose()
  public search?: string;

  @Expose()
  public page?: number;

  @Expose({ name: 'per_page' })
  public perPage?: number;

  @Expose()
  public all?: boolean;

  @Exclude()
  public sortBy?: string;

  @Exclude()
  public desc?: boolean;

  @Expose({ name: 'expand', toPlainOnly: true })
  public relations?: Array<string>;

  @Expose()
  public get sort(): string {
    return (this.desc) ? `-${this.sortBy}` : this.sortBy;
  }

  constructor(model: Partial<PaginationRequest> = {}) {
    Object.assign(this, model);
  }
}
