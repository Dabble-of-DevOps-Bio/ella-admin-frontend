import { configuration } from '@configurations';
import { User } from '../models';

export class UserState {
  public profile: User;
  public language: string;

  constructor() {
    this.profile = new User({
      id: parseInt(localStorage.getItem('user_id'), 10),
      firstName: localStorage.getItem('user_first_name'),
      lastName: localStorage.getItem('user_last_name'),
      authGroup: Number(localStorage.getItem('user_auth_group'))
    });
    this.language = localStorage.getItem('user_language') || configuration.language.default;
  }
}
