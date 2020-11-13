import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { PublicLoginPageFacade } from './login.facade';
import { PublicLoginForm } from './shared/forms';

@Component({
  selector: 'public-login-page',
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicLoginPageComponent implements OnDestroy {
  public formState$: Observable<FormGroupState<PublicLoginForm>>;
  public isSubmitting$: Observable<boolean>;
  public isLoginFailed$: Observable<boolean>;

  constructor(
    private facade: PublicLoginPageFacade
  ) {
    this.formState$ = this.facade.formState$;
    this.isSubmitting$ = this.facade.isSubmitting$;
    this.isLoginFailed$ = this.facade.isLoginFailed$;
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }

  public onSubmit(): void {
    this.facade.tryLogin();
  }
}
