import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { AccountProfilePageFacade } from './profile.facade';

@Component({
  selector: 'account-profile-page',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountProfilePageComponent {
  public profile$: Observable<User>;

  constructor(
    private facade: AccountProfilePageFacade
  ) {
    this.profile$ = this.facade.profile$;
  }

  public logout(): void {
    this.facade.logout();
  }
}
