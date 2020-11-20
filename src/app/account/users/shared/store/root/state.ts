import { User } from '@shared/user';

export class AccountUsersPageRootState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public totalItems: number;
  public items: Array<User>;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.totalItems = 0;
    this.items = [];
  }
}
