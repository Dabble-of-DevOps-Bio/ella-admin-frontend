import { Expose, Type } from 'class-transformer';

export class UserGroup {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  constructor(model: Partial<UserGroup> = {}) {
    Object.assign(this, model);
  }
}
