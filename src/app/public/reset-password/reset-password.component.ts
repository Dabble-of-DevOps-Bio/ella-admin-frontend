import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicResetPasswordPageFacade } from './reset-password.facade';
import { PublicResetPasswordForm } from './shared/forms';

@Component({
  selector: 'public-reset-password-page',
  templateUrl: 'reset-password.html',
  styleUrls: ['reset-password.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicResetPasswordPageComponent implements OnDestroy {
  public formState$: Observable<FormGroupState<PublicResetPasswordForm>>;
  public isSubmitting$: Observable<boolean>;

  constructor(
    private facade: PublicResetPasswordPageFacade
  ) {
    this.formState$ = this.facade.formState$;
    this.isSubmitting$ = this.facade.isSubmitting$;

    this.facade.checkToken();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public onSubmit(): void {
    this.facade.resetPassword();
  }
}
