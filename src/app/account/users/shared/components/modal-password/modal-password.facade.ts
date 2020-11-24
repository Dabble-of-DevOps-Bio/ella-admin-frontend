import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUsersModalPasswordActions, AccountUsersModalPasswordSelectors } from '../../store';
import { AccountUsersPasswordForm } from '../../forms';
import { BaseModalFacade } from '@shared/base-modal';

@Injectable()
export class AccountUsersModalPasswordFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountUsersPasswordForm>> {
    return this.store.select(AccountUsersModalPasswordSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(AccountUsersModalPasswordSelectors.isSubmitting);
  }

  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountUsersModalPasswordActions.resetState());
  }

  public initModal(id: number): void {
    this.store.dispatch(AccountUsersModalPasswordActions.initModal({ id }));
  }

  public save(modalID: string): void {
    this.store.dispatch(AccountUsersModalPasswordActions.save({ modalID }));
  }
}
