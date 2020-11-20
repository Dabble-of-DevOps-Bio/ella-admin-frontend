import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountUsersModalDetailsActions } from '@app/account/users/shared/store';

@Injectable()
export class AccountNavbarSecondaryFacade {
  constructor(
    private store: Store<AppState>
  ) { }

  public openNewUserModal(): void {
    this.store.dispatch(AccountUsersModalDetailsActions.openDetailsDialog());
  }
}
