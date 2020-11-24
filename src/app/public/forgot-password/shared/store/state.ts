import { createFormGroupState, FormGroupState } from 'ngrx-forms';
import { PublicForgotPasswordForm } from '../forms';

export class PublicForgotPasswordPageState {
  public isSubmitting: boolean;
  public formState: FormGroupState<PublicForgotPasswordForm>;
  public isShowSuccess: boolean;

  constructor() {
    this.isSubmitting = false;
    this.isShowSuccess = false;
    this.formState = createFormGroupState<PublicForgotPasswordForm>('PublicForgotPasswordForm', {
      email: ''
    });
  }
}
