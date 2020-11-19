import { Expose, Transform } from 'class-transformer';

export class PaginationRequest {
  @Expose({ toPlainOnly: true })
  public page?: number;

  @Expose({ name: 'per_page', toPlainOnly: true })
  public perPage?: number;

  @Transform((value) => (value) ? 1 : undefined, { toPlainOnly: true })
  @Expose({ toPlainOnly: true })
  public all?: boolean;

  @Expose({ toPlainOnly: true })
  public query?: string;

  @Expose({ name: 'order_by', toPlainOnly: true })
  public orderBy?: any;

  @Transform((value) => (value) ? 1 : 0, { toPlainOnly: true })
  @Expose({ toPlainOnly: true })
  public desc?: boolean;

  @Expose({ name: 'with', toPlainOnly: true })
  public relations?: Array<string>;

  @Expose({ name: 'with_count', toPlainOnly: true })
  public withCount?: Array<string>;

  constructor(model: Partial<PaginationRequest> = {}) {
    Object.assign(this, model);
  }
}
