import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store';
import { GenePanel } from '@shared/gene-panel';
import { AgGridColumn } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ModalService } from '@shared/modal';
import { TranslateService } from '@ngx-translate/core';
import { AccountGenePanelsPageRootActions, AccountGenePanelsPageRootSelectors } from './shared/store/root';
import { AccountGenePanelsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountGenePanelsModalDetailsComponent } from './shared/components/modal-details/modal-details.component';

@Injectable()
export class AccountGenePanelsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountGenePanelsPageRootSelectors.isLoading);
  }

  public get items$(): Observable<Array<GenePanel>> {
    return this.store.select(AccountGenePanelsPageRootSelectors.items);
  }

  public get totalItems$(): Observable<number> {
    return this.store.select(AccountGenePanelsPageRootSelectors.totalItems);
  }

  public get isSendingRequest$(): Observable<boolean> {
    return this.store.select(AccountGenePanelsPageRootSelectors.isSendingRequest);
  }

  public get columnDefs(): Array<Partial<AgGridColumn>> {
    return [
      {
        headerName: this.translateService.instant('ACCOUNT.GENE_PANELS.COLUMNS.TEXT_ID'),
        field: 'id',
        sortable: true,
        filter: true,
        maxWidth: 80
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GENE_PANELS.COLUMNS.TEXT_NAME'),
        field: 'name',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GENE_PANELS.COLUMNS.TEXT_GENOME_REFERENCE'),
        field: 'genomeReference',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GENE_PANELS.COLUMNS.TEXT_VERSION'),
        field: 'version',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.GENE_PANELS.COLUMNS.TEXT_ACTIONS'),
        cellRenderer: 'actionsCellRenderer',
        maxWidth: 180
      }
    ];
  }

  public get frameworkComponents(): any {
    return {
      actionsCellRenderer: AccountGenePanelsActionsCellRendererComponent
    };
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: ModalService,
    private translateService: TranslateService
  ) { }

  public getItem$(id: number): Observable<GenePanel> {
    return this.store.select(AccountGenePanelsPageRootSelectors.item, id);
  }

  public resetState(): void {
    this.store.dispatch(AccountGenePanelsPageRootActions.resetState());
  }

  public loadItems(): void {
    this.store.dispatch(AccountGenePanelsPageRootActions.loadItems());
  }

  public openDetailsModal(id: number): void {
    this.modalService.open(AccountGenePanelsModalDetailsComponent, {
      panelClass: 'gene-panels-modal-panel',
      data: { id }
    });
  }
}
