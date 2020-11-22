import { AccountUsersPasswordForm } from '../../forms';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';

export class AccountUsersModalPasswordState {
  public isSubmitting: boolean;
  public formState: FormGroupState<AccountUsersPasswordForm>;

  constructor() {
    this.isSubmitting = false;
    this.formState = createFormGroupState<AccountUsersPasswordForm>('AccountUsersPasswordForm', {
      password: '',
      id: null
    });
  }
}
