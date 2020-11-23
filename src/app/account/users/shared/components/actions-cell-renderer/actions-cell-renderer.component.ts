import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountUsersPageFacade } from '@app/account/users/users.facade';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUsersActionsCellRendererComponent implements ICellRendererAngularComp {
  public isAdmin$: Observable<boolean>;
  private params: any;

  constructor(
    private facade: AccountUsersPageFacade
  ) {
    this.isAdmin$ = this.facade.isAdmin$;
  }

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

  public openChangePasswordModal(): void {
    this.facade.openChangePasswordModal(this.params.data.id);
  }

  public openDeleteModal(): void {
    this.facade.openDeleteModal(this.params.data.id);
  }
}
