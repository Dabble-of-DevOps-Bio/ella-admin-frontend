import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountGenPanelsPageFacade } from '@app/account/gen-panels/gen-panels.facade';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'gen-panels-actions-cell-renderer',
  templateUrl: 'actions-cell-renderer.html',
  styleUrls: ['actions-cell-renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGenPanelsActionsCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  constructor(
    private facade: AccountGenPanelsPageFacade
  ) { }

  public agInit(params: any): void {
    this.params = params;
  }

  public refresh(params?: any): boolean {
    return true;
  }

  public openEditModal(): void {
    this.facade.openDetailsModal(this.params.data.id);
  }
}
