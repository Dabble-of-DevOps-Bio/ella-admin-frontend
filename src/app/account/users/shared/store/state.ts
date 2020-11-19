import { AccountUsersModalDetailsState } from './modal-details';
import { AccountUsersPageRootState } from './root';

export class AccountUsersPageState {
  public rootState: AccountUsersPageRootState;
  public modalDetails: AccountUsersModalDetailsState;

  constructor() {
    this.rootState = new AccountUsersPageRootState();
    this.modalDetails = new AccountUsersModalDetailsState();
  }
}
