import { AccountGenPanelsModalDetailsState } from './modal-details';
import { AccountGenPanelsPageRootState } from './root';

export class AccountGenPanelsPageState {
  public rootState: AccountGenPanelsPageRootState;
  public modalDetails: AccountGenPanelsModalDetailsState;

  constructor() {
    this.rootState = new AccountGenPanelsPageRootState();
    this.modalDetails = new AccountGenPanelsModalDetailsState();
  }
}
