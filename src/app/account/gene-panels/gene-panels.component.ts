import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountGenePanelsPageFacade } from './gene-panels.facade';
import { Observable } from 'rxjs';
import { GenePanel } from '@shared/gene-panel';
import { AgGridColumn } from 'ag-grid-angular';

@Component({
  selector: 'account-gene-panels-page',
  templateUrl: 'gene-panels.html',
  styleUrls: ['gene-panels.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGenePanelsPageComponent implements OnDestroy {
  public items$: Observable<Array<GenePanel>>;
  public isLoading$: Observable<boolean>;
  public isSendingRequest$: Observable<boolean>;
  public columnDefs: Array<Partial<AgGridColumn>>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountGenePanelsPageFacade
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
