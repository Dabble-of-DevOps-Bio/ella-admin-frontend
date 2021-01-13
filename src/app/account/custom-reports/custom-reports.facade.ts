import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountCustomReportsPageActions, AccountCustomReportsPageSelectors } from './shared/store';
import { AppState } from '@shared/store';
import { TranslateService } from '@ngx-translate/core';
import { Analysis } from '@shared/analysis';
import { AgGridColumn } from 'ag-grid-angular';
import { AccountCustomReportsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';

@Injectable()
export class AccountCustomReportsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountCustomReportsPageSelectors.isLoading);
  }

  public get items$(): Observable<Array<Analysis>> {
    return this.store.select(AccountCustomReportsPageSelectors.items);
  }

  public get totalItems$(): Observable<number> {
    return this.store.select(AccountCustomReportsPageSelectors.totalItems);
  }

  public get columnDefs(): Array<Partial<AgGridColumn>> {
    return [
      {
        headerName: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.COLUMNS.TEXT_ID'),
        field: 'id',
        sortable: true,
        filter: true,
        maxWidth: 80
      },
      {
        headerName: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.COLUMNS.TEXT_NAME'),
        field: 'name',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.COLUMNS.TEXT_TYPE'),
        field: 'type',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.COLUMNS.TEXT_METHOD'),
        field: 'method',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.CUSTOM_REPORTS.COLUMNS.TEXT_ACTIONS'),
        cellRenderer: 'actionsCellRenderer',
        maxWidth: 180
      }
    ];
  }

  public get frameworkComponents(): any {
    return {
      actionsCellRenderer: AccountCustomReportsActionsCellRendererComponent
    };
  }

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) { }

  public getItem$(id: number): Observable<Analysis> {
    return this.store.select(AccountCustomReportsPageSelectors.item, id);
  }

  public resetState(): void {
    this.store.dispatch(AccountCustomReportsPageActions.resetState());
  }

  public loadItems(): void {
    this.store.dispatch(AccountCustomReportsPageActions.loadItems());
  }
}
