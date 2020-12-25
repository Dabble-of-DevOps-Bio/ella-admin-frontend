import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountUserGroupsPageFacade } from '@app/account/user-groups/user-groups.facade';
import { BaseCellRendererComponent } from '@shared/base-cell-renderer';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-groups-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUserGroupsActionsCellRendererComponent extends BaseCellRendererComponent {
  public isAdmin$: Observable<boolean>;

  constructor(
    private facade: AccountUserGroupsPageFacade
  ) {
    super();
  }

  public openEditModal(): void {
    this.facade.openDetailsModal(this.params.data.id);
  }

  public openDeleteModal(): void {
    this.facade.openDeleteModal(this.params.data.id);
  }
}
