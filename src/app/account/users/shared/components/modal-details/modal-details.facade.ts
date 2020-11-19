import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { AccountUsersModalDetailsActions, AccountUsersModalDetailsSelectors } from '../../store';
import { AccountUsersDetailsForm } from '../../forms';
import { TranslateService } from '@ngx-translate/core';
import { BaseModalFacade } from '@shared/base-modal';

@Injectable()
export class AccountUsersModalDetailsFacade extends BaseModalFacade {
  public get formState$(): Observable<FormGroupState<AccountUsersDetailsForm>> {
    return this.store.select(AccountUsersModalDetailsSelectors.formState);
  }

  public get isSubmitting$(): Observable<boolean> {
    return this.store.select(AccountUsersModalDetailsSelectors.isSubmitting);
  }

  constructor(
    protected store: Store<AppState>,
    private translateService: TranslateService
  ) {
    super(store);
  }

  public resetState(): void {
    this.store.dispatch(AccountUsersModalDetailsActions.resetState());
  }

  public initModal(): void {
    this.store.dispatch(AccountUsersModalDetailsActions.initModal());
  }

  public updateEmail(modalID: string): void {
    this.store.dispatch(AccountUsersModalDetailsActions.update({ modalID }));
  }
}
