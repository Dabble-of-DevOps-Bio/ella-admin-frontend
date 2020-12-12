import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { GenPanel } from '@shared/gen-panel';
import { AgGridColumn } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ModalService } from '@shared/modal';
import { TranslateService } from '@ngx-translate/core';
import { AccountGenPanelsPageRootActions, AccountGenPanelsPageRootSelectors } from './shared/store/root';
import { AccountGenPanelsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountGenPanelsModalDetailsComponent } from './shared/components/modal-details/modal-details.component';

@Injectable()
export class AccountGenPanelsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountGenPanelsPageRootSelectors.isLoading);
  }

  public get items$(): Observable<Array<GenPanel>> {
    return this.store.select(AccountGenPanelsPageRootSelectors.items);
  }

  public get totalItems$(): Observable<number> {
    return this.store.select(AccountGenPanelsPageRootSelectors.totalItems);
  }

  public get isSendingRequest$(): Observable<boolean> {
    return this.store.select(AccountGenPanelsPageRootSelectors.isSendingRequest);
  }

  public get columnDefs(): Array<Partial<AgGridColumn>> {
    return [
      {
        headerName: this.translateService.instant('ACCOUNT.GEN_PANELS.COLUMNS.TEXT_ID'),
        field: 'id',
        sortable: true,
        filter: true,
        maxWidth: 80
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GEN_PANELS.COLUMNS.TEXT_NAME'),
        field: 'name',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GEN_PANELS.COLUMNS.TEXT_GENOME_REFERENCE'),
        field: 'genomeReference',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GEN_PANELS.COLUMNS.TEXT_VERSION'),
        field: 'version',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GEN_PANELS.COLUMNS.TEXT_ACTIONS'),
        cellRenderer: 'actionsCellRenderer',
        maxWidth: 180
      }
    ];
  }

  public get frameworkComponents(): any {
    return {
      actionsCellRenderer: AccountGenPanelsActionsCellRendererComponent
    };
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: ModalService,
    private translateService: TranslateService
  ) { }

  public getItem$(id: number): Observable<GenPanel> {
    return this.store.select(AccountGenPanelsPageRootSelectors.item, id);
  }

  public resetState(): void {
    this.store.dispatch(AccountGenPanelsPageRootActions.resetState());
  }

  public loadItems(): void {
    this.store.dispatch(AccountGenPanelsPageRootActions.loadItems());
  }

  public openDetailsModal(id: number): void {
    this.modalService.open(AccountGenPanelsModalDetailsComponent, {
      panelClass: 'gen-panels-modal-panel',
      data: { id }
    });
  }
}
