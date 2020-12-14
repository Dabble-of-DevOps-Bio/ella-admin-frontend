import { AccountGenPanelsDetailsForm } from '../../forms';
import { box, createFormGroupState, FormGroupState } from 'ngrx-forms';
import { UserGroup } from '@shared/user-group';

export class AccountGenPanelsModalDetailsState {
  public isSubmitting: boolean;
  public formState: FormGroupState<AccountGenPanelsDetailsForm>;
  public items: Array<UserGroup>;
  public totalItems: number;
  public isLoading: boolean;
  public page: number;
  public perPage: number;
  public query: string;

  constructor() {
    this.isSubmitting = false;
    this.page = 1;
    this.perPage = 15;
    this.query = '';
    this.formState = createFormGroupState<AccountGenPanelsDetailsForm>('AccountGenPanelsDetailsForm', {
      id: null,
      groups: box([])
    });
  }
}
