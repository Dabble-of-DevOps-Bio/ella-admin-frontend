import { DateTransformer } from '@shared/date-transformer';
import { Expose, Transform, Type, Exclude } from 'class-transformer';

export class User {
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

  @Expose({ name: 'group_id' })
  public groupID: number;

  @Expose({ name: 'auth_groups' })
  public authGroups: Array<number>;

  @Expose({ name: 'is_staff' })
  public isStaff: boolean;

  @Expose({ name: 'is_superuser' })
  public isSuperUser: boolean;

  @Expose()
  public active: boolean;

  @Transform(DateTransformer)
  @Expose({ name: 'date_joined' })
  public dateJoined: Date;

  @Transform(DateTransformer)
  @Expose({ name: 'last_login' })
  public lastLogin: Date;

  @Transform(DateTransformer)
  @Expose({ name: 'created_at' })
  public createdAt: Date;

  @Transform(DateTransformer)
  @Expose({ name: 'updated_at' })
  public updatedAt: Date;

  @Exclude()
  public get shortName(): string {
    return this.firstName?.charAt(0) + ((this.firstName?.length) < 2 ? '' : '. ') + this.lastName;
  }

  constructor(model: Partial<User> = {}) {
    Object.assign(this, model);
  }
}
