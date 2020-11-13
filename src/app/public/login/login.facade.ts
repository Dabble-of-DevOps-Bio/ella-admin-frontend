import { AppState } from '@shared/store';
import { FormGroupState } from 'ngrx-forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicLoginForm } from './shared/forms';
import { PublicLoginPageActions, PublicLoginPageSelectors } from './shared/store';
import { Store } from '@ngrx/store';

@Injectable()
export class PublicLoginPageFacade {
  public get formState$(): Observable<FormGroupState<PublicLoginForm>> {
    return this.store.select(PublicLoginPageSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(PublicLoginPageSelectors.isSubmitting);
  }

  public get isLoginFailed$(): Observable<boolean> {
    return this.store.select(PublicLoginPageSelectors.isLoginFailed);
  }

  constructor(
    private store: Store<AppState>
  ) { }

  public tryLogin(): void {
    this.store.dispatch(PublicLoginPageActions.tryLogin());
  }

  public resetState(): void {
    this.store.dispatch(PublicLoginPageActions.resetState());
  }
}
