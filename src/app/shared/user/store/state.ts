import { configuration } from '@configurations';
import { User } from '../models';

export class UserState {
  public profile: User;
  public language: string;

  constructor() {
    this.profile = new User({
      id: parseInt(localStorage.getItem('user_id'), 10),
      // roleID: parseInt(localStorage.getItem('user_role_id'), 10)
    });
    this.language = localStorage.getItem('user_language') || configuration.language.default;
  }
}
