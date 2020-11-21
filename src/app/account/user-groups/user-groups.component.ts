import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserGroup } from '@shared/user-group';
import { Observable } from 'rxjs';
import { AccountUserGroupsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountUserGroupsPageFacade } from './user-groups.facade';

@Component({
  selector: 'account-user-groups-page',
  templateUrl: 'user-groups.html',
  styleUrls: ['user-groups.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUserGroupsPageComponent implements OnDestroy {
  public items$: Observable<Array<UserGroup>>;
  public isLoading$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public columnDefs: Array<any>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountUserGroupsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.isSendingRequest$ = this.facade.isSendingRequest$;

    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, maxWidth: 80 },
      { headerName: 'Name', field: 'name', sortable: true, filter: true },
      { headerName: 'Actions', cellRenderer: 'actionsCellRenderer', maxWidth: 160 }
    ];

    this.frameworkComponents = {
      actionsCellRenderer: AccountUserGroupsActionsCellRendererComponent
    };

    this.facade.loadItems();
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  public ngOnDestroy(): void {
    this.facade.resetState();
  }
}
