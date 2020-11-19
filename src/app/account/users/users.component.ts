import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { User } from '@shared/user';
import { Observable } from 'rxjs';
import { AccountUsersActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountUsersPageFacade } from './users.facade';

@Component({
  selector: 'account-users-page',
  templateUrl: 'users.html',
  styleUrls: ['users.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUsersPageComponent implements OnDestroy {
  public items$: Observable<Array<User>>;
  public isLoading$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public columnDefs: Array<any>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountUsersPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.isSendingRequest$ = this.facade.isSendingRequest$;

    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, maxWidth: 80 },
      { headerName: 'First name', field: 'firstName', sortable: true, filter: true },
      { headerName: 'Last name', field: 'lastName', sortable: true, filter: true },
      { headerName: 'Email', field: 'email', sortable: true, filter: true },
      { headerName: 'Group', field: 'groupID', sortable: true, filter: true, maxWidth: 100 },
      { headerName: 'Superuser', field: 'isSuperUser', sortable: true, filter: true, maxWidth: 120 },
      { headerName: 'Active', field: 'active', sortable: true, filter: true, maxWidth: 100 },
      { headerName: 'Created', field: 'createdAt', sortable: true, filter: true, maxWidth: 120 },
      { headerHame: 'Actions', cellRenderer: 'actionsCellRenderer', maxWidth: 160 }
    ];

    this.frameworkComponents = {
      actionsCellRenderer: AccountUsersActionsCellRendererComponent
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
