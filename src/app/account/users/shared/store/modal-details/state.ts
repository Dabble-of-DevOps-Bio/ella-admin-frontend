import { AccountUsersDetailsForm } from '../../forms';
import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { UserGroup } from '@shared/user-group';

export class AccountUsersModalDetailsState {
  public isSubmitting: boolean;
  public groupItems: Array<UserGroup>;
  public formState: FormGroupState<AccountUsersDetailsForm>;

  constructor() {
    this.isSubmitting = false;
    this.groupItems = [];
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
