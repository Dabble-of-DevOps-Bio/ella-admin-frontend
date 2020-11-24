import { Expose, Type, Exclude } from 'class-transformer';

export class UpdateUserRequest {
  @Type(() => Number)
  @Expose()
  public id: number;

  @Expose()
  public username: string;

  @Expose({ name: 'first_name' })
  public firstName: string;

  @Expose({ name: 'last_name' })
  public lastName: string;

  @Expose()
  public email: string;

  @Expose()
  public group: number;

  @Expose({ name: 'auth_group' })
  public authGroup: number;

  @Expose({ name: 'new_password' })
  @Exclude({ toClassOnly: true })
  public newPassword: string;

  constructor(model: Partial<UpdateUserRequest> = {}) {
    Object.assign(this, model);
  }
}
