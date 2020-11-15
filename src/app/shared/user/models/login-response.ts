import { Type, Expose } from 'class-transformer';
import { User } from '.';

export class LoginResponse {
  public token: string;

  @Type(() => User)
  public user: User;

  public ttl?: number;

  @Expose({ name: 'refresh_ttl' })
  public refreshTTL?: number;

  constructor(model: Partial<LoginResponse> = {}) {
    Object.assign(this, model);
  }
}
