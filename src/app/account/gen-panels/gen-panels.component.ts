import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountGenPanelsPageFacade } from './gen-panels.facade';
import { Observable } from 'rxjs';
import { GenPanel } from '@shared/gen-panel';
import { AgGridColumn } from 'ag-grid-angular';

@Component({
  selector: 'account-page',
  templateUrl: 'gen-panels.html',
  styleUrls: ['gen-panels.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent implements OnDestroy {
  public items$: Observable<Array<GenPanel>>;
  public isLoading$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public columnDefs: Array<Partial<AgGridColumn>>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountGenPanelsPageFacade
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
