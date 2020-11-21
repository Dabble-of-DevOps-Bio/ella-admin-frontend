import { AccountUserGroupsModalDetailsState } from './modal-details';
import { AccountUserGroupsPageRootState } from './root';

export class AccountUserGroupsPageState {
  public rootState: AccountUserGroupsPageRootState;
  public modalDetails: AccountUserGroupsModalDetailsState;

  constructor() {
    this.rootState = new AccountUserGroupsPageRootState();
    this.modalDetails = new AccountUserGroupsModalDetailsState();
  }
}
