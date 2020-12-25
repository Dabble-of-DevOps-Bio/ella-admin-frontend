import { Analysis } from '@shared/analysis';

export class AccountAnalysesPageState {
  public isLoading: boolean;
  public totalItems: number;
  public items: Array<Analysis>;

  constructor() {
    this.isLoading = false;
    this.totalItems = 0;
    this.items = [];
  }
}
