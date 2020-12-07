import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PublicResetPasswordPageActions, PublicResetPasswordPageSelectors } from './shared/store';
import { PublicResetPasswordForm } from './shared/forms';

@Injectable()
export class PublicResetPasswordPageFacade {
  public get formState$(): Observable<FormGroupState<PublicResetPasswordForm>> {
    return this.store.select(PublicResetPasswordPageSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(PublicResetPasswordPageSelectors.isSubmitting);
  }

  constructor(
    private store: Store<AppState>
  ) { }

  public checkToken(): void {
    this.store.dispatch(PublicResetPasswordPageActions.checkToken());
  }

  public resetPassword(): void {
    this.store.dispatch(PublicResetPasswordPageActions.resetPassword());
  }

  public resetState(): void {
    this.store.dispatch(PublicResetPasswordPageActions.resetState());
  }
}
