import { UserGroup } from "@shared/user-group";

export class AccountUserGroupsPageRootState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public totalItems: number;
  public items: Array<UserGroup>;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.totalItems = 0;
    this.items = [];
  }
}
