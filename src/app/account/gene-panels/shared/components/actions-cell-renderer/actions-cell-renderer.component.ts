import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountGenePanelsPageFacade } from '@app/account/gene-panels/gene-panels.facade';
import { BaseCellRendererComponent } from '@shared/base-cell-renderer';

@Component({
  selector: 'gene-panels-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGenePanelsActionsCellRendererComponent extends BaseCellRendererComponent {
  constructor(
    private facade: AccountGenePanelsPageFacade
  ) {
    super();
  }

  public openEditModal(): void {
    this.facade.openDetailsModal(this.params.data.id);
  }
}
