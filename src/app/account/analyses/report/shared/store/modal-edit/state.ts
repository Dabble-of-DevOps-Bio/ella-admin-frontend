import { AccountAnalysesResultForm } from '../../forms';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export class AccountAnalysesReportModalEditState {
  public formState: FormGroupState<AccountAnalysesResultForm>;

  constructor() {
    this.formState = createFormGroupState<AccountAnalysesResultForm>('AccountAnalysesResultForm', {
      gene: '',
      variant: '',
      zygosity: '',
      variantClassification: ''
    });
  }
}
