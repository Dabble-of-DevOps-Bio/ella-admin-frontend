import { Exclude, Expose, Type } from 'class-transformer';

export class PaginationResponse<T> {
  @Expose({ name: 'current_page' })
  public currentPage: number;

  @Expose({ name: 'per_page' })
  public perPage: number;

  public total: number;

  @Type((options) => {
    return (<PaginationResponse<T>>options.newObject).type;
  })
  public items: Array<T>;

  @Exclude()
  private type: Function;

  constructor(type: Function) {
    this.type = type;
  }
}
