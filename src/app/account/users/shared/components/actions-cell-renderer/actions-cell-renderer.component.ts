import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountUsersPageFacade } from '@app/account/users/users.facade';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'users-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUsersActionsCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  constructor(private facade: AccountUsersPageFacade) { }

  public agInit(params: any): void {
    this.params = params;
  }

  public refresh(params?: any): boolean {
    return true;
  }

  public openEditModal(): void {
    this.facade.openDetailsModal();
  }

  public openResetModal(): void {
    this.facade.openResetPasswordModal(1);
  }

  public openDeleteModal(): void {
    this.facade.openDeleteModal(1);
  }
}
