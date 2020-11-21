import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserGroup } from '@shared/user-group';
import { AgGridColumn } from 'ag-grid-angular';
import { Observable } from 'rxjs';
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
  public columnDefs: Array<Partial<AgGridColumn>>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountUserGroupsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;
    this.isSendingRequest$ = this.facade.isSendingRequest$;

    this.columnDefs = this.facade.columnDefs;
    this.frameworkComponents = this.facade.frameworkComponents;

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
