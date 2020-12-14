import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AccountAnalysesPageFacade } from './analyses.facade';
import { Observable } from 'rxjs';
import { Analysis } from '@shared/analysis';
import { AgGridColumn } from 'ag-grid-angular';

@Component({
  selector: 'account-page',
  templateUrl: 'analyses.html',
  styleUrls: ['analyses.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountAnalysesPageComponent implements OnDestroy {
  public items$: Observable<Array<Analysis>>;
  public isLoading$: Observable<boolean>;
  public columnDefs: Array<Partial<AgGridColumn>>;
  public frameworkComponents: any;
  private gridApi: any;

  constructor(
    private facade: AccountAnalysesPageFacade
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
