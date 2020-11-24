import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicForgotPasswordForm } from './shared/forms';
import { PublicForgotPasswordPageActions, PublicForgotPasswordPageSelectors } from './shared/store';
import { Store } from '@ngrx/store';

@Injectable()
export class PublicForgotPasswordPageFacade {
  public get formState$(): Observable<FormGroupState<PublicForgotPasswordForm>> {
    return this.store.select(PublicForgotPasswordPageSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(PublicForgotPasswordPageSelectors.isSubmitting);
  }

  constructor(
    private store: Store<AppState>
  ) { }

  public forgotPassword(): void {
    this.store.dispatch(PublicForgotPasswordPageActions.forgotPassword());
  }

  public resetState(): void {
    this.store.dispatch(PublicForgotPasswordPageActions.resetState());
  }
}
