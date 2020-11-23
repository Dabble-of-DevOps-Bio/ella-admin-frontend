import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountNavbarSecondaryFacade } from './navbar-secondary.facade';

@Component({
  selector: 'account-navbar-secondary',
  templateUrl: 'navbar-secondary.html',
  styleUrls: ['navbar-secondary.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNavbarSecondaryComponent {
  public isAdmin$: Observable<boolean>;
  public isUsersPage$: Observable<boolean>;
  public isUserGroupsPage$: Observable<boolean>;

  constructor(
    private facade: AccountNavbarSecondaryFacade
  ) {
    this.isAdmin$ = this.facade.isAdmin$;
    this.isUsersPage$ = this.facade.isUsersPage();
    this.isUserGroupsPage$ = this.facade.isUserGroupsPage();
  }

  public openNewUserModal(): void {
    this.facade.openNewUserModal();
  }

  public openNewUserGroupModal(): void {
    this.facade.openNewUserGroupModal();
  }
}
