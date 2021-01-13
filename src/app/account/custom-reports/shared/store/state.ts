import { CustomReport } from '@shared/custom-report';

export class AccountCustomReportsPageState {
  public isLoading: boolean;
  public totalItems: number;
  public items: Array<CustomReport>;

  constructor() {
    this.isLoading = false;
    this.totalItems = 0;
    this.items = [];
  }
}
