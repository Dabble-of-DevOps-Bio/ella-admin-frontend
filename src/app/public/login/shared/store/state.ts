import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicLoginForm } from '../forms';

export class PublicLoginPageState {
  public isSubmitting: boolean;
  public formState: FormGroupState<PublicLoginForm>;
  public isLoginFailed: boolean;

  constructor() {
    this.isSubmitting = false;
    this.isLoginFailed = false;
    this.formState = createFormGroupState<PublicLoginForm>('PublicLoginForm', {
      username: 'superuser',
      password: 'Password#123'
    });
  }
}
