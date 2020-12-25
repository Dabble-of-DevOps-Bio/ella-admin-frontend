import { AccountAnalysesReportModalEditState } from './modal-edit';
import { AccountAnalysesReportPageRootState } from './root';

export class AccountAnalysesReportPageState {
  public rootState: AccountAnalysesReportPageRootState;
  public modalEdit: AccountAnalysesReportModalEditState;

  constructor() {
    this.rootState = new AccountAnalysesReportPageRootState();
    this.modalEdit = new AccountAnalysesReportModalEditState();
  }
}
