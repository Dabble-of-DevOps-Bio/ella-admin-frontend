import { AccountUsersModalDetailsState } from './modal-details';
import { AccountUsersModalPasswordState } from './modal-password';
import { AccountUsersPageRootState } from './root';

export class AccountUsersPageState {
  public rootState: AccountUsersPageRootState;
  public modalDetails: AccountUsersModalDetailsState;
  public modalPassword: AccountUsersModalPasswordState;

  constructor() {
    this.rootState = new AccountUsersPageRootState();
    this.modalDetails = new AccountUsersModalDetailsState();
    this.modalPassword = new AccountUsersModalPasswordState();
  }
}
