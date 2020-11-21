import { AccountUserGroupsDetailsForm } from '../../forms';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export class AccountUserGroupsModalDetailsState {
  public isSubmitting: boolean;
  public formState: FormGroupState<AccountUserGroupsDetailsForm>;

  constructor() {
    this.isSubmitting = false;
    this.formState = createFormGroupState<AccountUserGroupsDetailsForm>('AccountUserGroupsDetailsForm', {
      name: '',
      id: null
    });
  }
}
