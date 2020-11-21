import { Exclude, Expose, Type } from 'class-transformer';

export class PaginationResponse<T> {
  @Expose({ name: 'previous_page' })
  public previousPage: number;

  @Expose({ name: 'next_page' })
  public nextPage: number;

  @Expose({ name: 'last_page' })
  public lastPage: number;

  @Expose({ name: 'total_items' })
  public totalItems: number;

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
