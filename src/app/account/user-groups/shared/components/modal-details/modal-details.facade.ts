import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUserGroupsModalDetailsActions, AccountUserGroupsModalDetailsSelectors } from '../../store';
import { BaseModalFacade } from '@shared/base-modal';
import { AccountUserGroupsDetailsForm } from '../../forms';

@Injectable()
export class AccountUserGroupsModalDetailsFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountUserGroupsDetailsForm>> {
    return this.store.select(AccountUserGroupsModalDetailsSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(AccountUserGroupsModalDetailsSelectors.isSubmitting);
  }

  constructor(
    protected store: Store<AppState>
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountUserGroupsModalDetailsActions.resetState());
  }

  public initModal(id: number): void {
    this.store.dispatch(AccountUserGroupsModalDetailsActions.initModal({ id }));
  }

  public save(modalID: string): void {
    this.store.dispatch(AccountUserGroupsModalDetailsActions.save({ modalID }));
  }
}
