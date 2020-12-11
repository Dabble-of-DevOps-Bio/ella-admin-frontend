import { GenPanel } from '@shared/gen-panel';

export class AccountGenPanelsPageRootState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public totalItems: number;
  public items: Array<GenPanel>;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.totalItems = 0;
    this.items = [];
  }
}
