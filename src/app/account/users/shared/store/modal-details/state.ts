import { AccountUsersDetailsForm } from '../../forms';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export class AccountUsersModalDetailsState {
  public isSubmitting: boolean;
  public formState: FormGroupState<AccountUsersDetailsForm>;

  constructor() {
    this.isSubmitting = false;
    this.formState = createFormGroupState<AccountUsersDetailsForm>('AccountUsersDetailsForm', {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      id: null,
      authGroup: null,
      groupID: null
    });
  }
}
