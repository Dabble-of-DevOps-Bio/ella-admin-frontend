import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountUsersModalDetailsActions } from '@app/account/users/shared/store';
import { Observable } from 'rxjs';
import { UserSelectors } from '@shared/user';
import { NavigationSelectors } from '@shared/navigation';
import { map } from 'rxjs/operators';
import { AccountUserGroupsModalDetailsActions } from '@app/account/user-groups/shared/store';
import { ModalService } from '@shared/modal';

@Injectable()
export class AccountNavbarSecondaryFacade {
  public get isAdmin$(): Observable<boolean> {
    return this.store.select(UserSelectors.isAdmin);
  }

  public get url$(): Observable<string> {
    return this.store.select(NavigationSelectors.selectUrl);
  }

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) { }

  public openNewUserModal(): void {
    this.store.dispatch(AccountUsersModalDetailsActions.openDetailsDialog());
  }

  public openNewUserGroupModal(): void {
    this.store.dispatch(AccountUserGroupsModalDetailsActions.openDetailsDialog());
  }

  public isUsersPage(): Observable<boolean> {
    return this.url$.pipe(
      map((url) => !url.indexOf('/users'))
    );
  }

  public isUserGroupsPage(): Observable<boolean> {
    return this.url$.pipe(
      map((url) => !url.indexOf('/user-groups'))
    );
  }
}
