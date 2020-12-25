import { AccountGenePanelsModalDetailsState } from './modal-details';
import { AccountGenePanelsPageRootState } from './root';

export class AccountGenePanelsPageState {
  public rootState: AccountGenePanelsPageRootState;
  public modalDetails: AccountGenePanelsModalDetailsState;

  constructor() {
    this.rootState = new AccountGenePanelsPageRootState();
    this.modalDetails = new AccountGenePanelsModalDetailsState();
  }
}
