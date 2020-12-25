import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccountAnalysesPageActions, AccountAnalysesPageSelectors } from './shared/store';
import { AppState } from '@shared/store';
import { TranslateService } from '@ngx-translate/core';
import { Analysis } from '@shared/analysis';
import { AgGridColumn } from 'ag-grid-angular';
import { AccountAnalysesActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';

@Injectable()
export class AccountAnalysesPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountAnalysesPageSelectors.isLoading);
  }

  public get items$(): Observable<Array<Analysis>> {
    return this.store.select(AccountAnalysesPageSelectors.items);
  }

  public get totalItems$(): Observable<number> {
    return this.store.select(AccountAnalysesPageSelectors.totalItems);
  }

  public get columnDefs(): Array<Partial<AgGridColumn>> {
    return [
      {
        headerName: this.translateService.instant('ACCOUNT.ANALYSES.COLUMNS.TEXT_ID'),
        field: 'id',
        sortable: true,
        filter: true,
        maxWidth: 80
      },
      {
        headerName: this.translateService.instant('ACCOUNT.ANALYSES.COLUMNS.TEXT_NAME'),
        field: 'name',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.ANALYSES.COLUMNS.TEXT_GENE_PANEL_NAME'),
        field: 'genePanelName',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.ANALYSES.COLUMNS.TEXT_GENE_PANEL_VERSION'),
        field: 'genePanelVersion',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.ANALYSES.COLUMNS.TEXT_ACTIONS'),
        cellRenderer: 'actionsCellRenderer',
        maxWidth: 180
      }
    ];
  }

  public get frameworkComponents(): any {
    return {
      actionsCellRenderer: AccountAnalysesActionsCellRendererComponent
    };
  }

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) { }

  public getItem$(id: number): Observable<Analysis> {
    return this.store.select(AccountAnalysesPageSelectors.item, id);
  }

  public resetState(): void {
    this.store.dispatch(AccountAnalysesPageActions.resetState());
  }

  public loadItems(): void {
    this.store.dispatch(AccountAnalysesPageActions.loadItems());
  }
}
