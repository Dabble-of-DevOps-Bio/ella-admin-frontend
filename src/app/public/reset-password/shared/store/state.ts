import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicResetPasswordForm } from '../forms';

export class PublicResetPasswordPageState {
  public isCheckingToken: boolean;
  public isSubmitting: boolean;
  public formState: FormGroupState<PublicResetPasswordForm>;
  public isShowSuccess: boolean;

  constructor() {
    this.isCheckingToken = false;
    this.isSubmitting = false;
    this.isShowSuccess = false;
    this.formState = createFormGroupState<PublicResetPasswordForm>('PublicResetPasswordForm', {
      password: '',
      repeatPassword: ''
    });
  }
}
