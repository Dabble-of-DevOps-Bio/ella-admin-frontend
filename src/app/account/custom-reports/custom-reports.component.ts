import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountCustomReportsPageFacade } from './custom-reports.facade';
import { Observable } from 'rxjs';
import { AgGridColumn } from 'ag-grid-angular';
import { CustomReport } from '@shared/custom-report';

@Component({
  selector: 'account-custom-reports-page',
  templateUrl: 'custom-reports.html',
  styleUrls: ['custom-reports.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCustomReportsPageComponent implements OnDestroy {
  public items$: Observable<Array<CustomReport>>;
  public isLoading$: Observable<boolean>;
  public columnDefs: Array<Partial<AgGridColumn>>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountCustomReportsPageFacade
  ) {
    this.items$ = this.facade.items$;
    this.isLoading$ = this.facade.isLoading$;

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
