import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicForgotPasswordPageFacade } from './forgot-password.facade';
import { PublicForgotPasswordForm } from './shared/forms';

@Component({
  selector: 'public-forogot-password-page',
  templateUrl: 'forgot-password.html',
  styleUrls: ['forgot-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicForgotPasswordPageComponent implements OnDestroy {
  public formState$: Observable<FormGroupState<PublicForgotPasswordForm>>;
  public isSubmitting$: Observable<boolean>;
  public isLoginFailed$: Observable<boolean>;

  constructor(
    private facade: PublicForgotPasswordPageFacade
  ) {
    this.formState$ = this.facade.formState$;
    this.isSubmitting$ = this.facade.isSubmitting$;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public onSubmit(): void {
    this.facade.forgotPassword();
  }
}
