import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountUserGroupsPageFacade } from '@app/account/user-groups/user-groups.facade';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-groups-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUserGroupsActionsCellRendererComponent implements ICellRendererAngularComp {
  public isAdmin$: Observable<boolean>;
  private params: any;

  constructor(
    private facade: AccountUserGroupsPageFacade
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

  public openDeleteModal(): void {
    this.facade.openDeleteModal(this.params.data.id);
  }
}
