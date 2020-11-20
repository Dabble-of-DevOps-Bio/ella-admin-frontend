import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountNavbarSecondaryFacade } from './navbar-secondary.facade';

@Component({
  selector: 'account-navbar-secondary',
  templateUrl: 'navbar-secondary.html',
  styleUrls: ['navbar-secondary.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNavbarSecondaryComponent {
  constructor(private facade: AccountNavbarSecondaryFacade) { }

  public openNewUserModal(): void {
    this.facade.openNewUserModal();
  }
}
