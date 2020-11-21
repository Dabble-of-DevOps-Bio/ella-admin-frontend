import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { User } from '@shared/user';
import { AgGridColumn } from 'ag-grid-angular';
import { Observable } from 'rxjs';
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
  public columnDefs: Array<Partial<AgGridColumn>>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountUsersPageFacade
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
