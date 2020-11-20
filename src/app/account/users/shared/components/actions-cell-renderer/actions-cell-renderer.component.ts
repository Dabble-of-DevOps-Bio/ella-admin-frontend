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
    this.facade.openDetailsModal(this.params.data.id);
  }

  public openResetModal(): void {
    this.facade.openResetPasswordModal(this.params.data.email);
  }

  public openDeleteModal(): void {
    this.facade.openDeleteModal(this.params.data.id);
  }
}
