import { Expose, Transform, Type, Exclude } from 'class-transformer';

export class User {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public username: string;

  constructor(model: Partial<User> = {}) {
    Object.assign(this, model);
  }
}
