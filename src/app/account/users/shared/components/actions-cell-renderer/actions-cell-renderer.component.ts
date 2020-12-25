import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountUsersPageFacade } from '@app/account/users/users.facade';
import { BaseCellRendererComponent } from '@shared/base-cell-renderer';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUsersActionsCellRendererComponent extends BaseCellRendererComponent {
  public isAdmin$: Observable<boolean>;

  constructor(
    private facade: AccountUsersPageFacade
  ) {
    super();

    this.isAdmin$ = this.facade.isAdmin$;
  }

  public openEditModal(): void {
    this.facade.openDetailsModal(this.params.data.id);
  }

  public openResetModal(): void {
    this.facade.openResetPasswordModal(this.params.data.email);
  }

  public openChangePasswordModal(): void {
    this.facade.openChangePasswordModal(this.params.data.id);
  }

  public openDeleteModal(): void {
    this.facade.openDeleteModal(this.params.data.id);
  }
}
