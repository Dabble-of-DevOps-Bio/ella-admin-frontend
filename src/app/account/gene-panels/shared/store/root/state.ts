import { GenePanel } from '@shared/gene-panel';

export class AccountGenePanelsPageRootState {
  public isLoading: boolean;
  public isSendingRequest: boolean;
  public totalItems: number;
  public items: Array<GenePanel>;

  constructor() {
    this.isLoading = false;
    this.isSendingRequest = false;
    this.totalItems = 0;
    this.items = [];
  }
}
