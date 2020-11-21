import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountUsersModalDetailsActions } from '@app/account/users/shared/store';
import { Observable } from 'rxjs';
import { UserSelectors } from '@shared/user';

@Injectable()
export class AccountNavbarSecondaryFacade {
  public get isAdmin$(): Observable<boolean> {
    return this.store.select(UserSelectors.isAdmin);
  }

  constructor(
    private store: Store<AppState>
  ) { }

  public openNewUserModal(): void {
    this.store.dispatch(AccountUsersModalDetailsActions.openDetailsDialog());
  }
}
