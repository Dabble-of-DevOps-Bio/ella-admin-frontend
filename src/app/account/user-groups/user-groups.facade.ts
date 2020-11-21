import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AccountUserGroupsPageRootActions, AccountUserGroupsPageRootSelectors } from './shared/store/root';
import { AccountModalConfirmationComponent } from '../shared/modal-confirmation';
import { ModalService } from '@shared/modal';
import { AccountUserGroupsModalDetailsComponent } from './shared/components/modal-details/modal-details.component';
import { UserGroup } from '@shared/user-group';

@Injectable()
export class AccountUserGroupsPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountUserGroupsPageRootSelectors.isLoading);
  }

  public get items$(): Observable<Array<UserGroup>> {
    return this.store.select(AccountUserGroupsPageRootSelectors.items);
  }

  public get totalItems$(): Observable<number> {
    return this.store.select(AccountUserGroupsPageRootSelectors.totalItems);
  }

  public get isSendingRequest$(): Observable<boolean> {
    return this.store.select(AccountUserGroupsPageRootSelectors.isSendingRequest);
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: ModalService
  ) { }

  public getItem$(id: number): Observable<UserGroup> {
    return this.store.select(AccountUserGroupsPageRootSelectors.item, id);
  }

  public resetState(): void {
    this.store.dispatch(AccountUserGroupsPageRootActions.resetState());
  }

  public loadItems(): void {
    this.store.dispatch(AccountUserGroupsPageRootActions.loadItems());
  }

  public openDetailsModal(id: number): void {
    this.modalService.open(AccountUserGroupsModalDetailsComponent, {
      panelClass: 'user-groups-modal-panel',
      data: { id }
    });
  }

  public deleteUserGroup(modalID: string, id: number): void {
    this.store.dispatch(AccountUserGroupsPageRootActions.deleteUserGroup({ modalID, id }));
  }

  public openDeleteModal(id: number): void {
    this.modalService.open(
      AccountModalConfirmationComponent,
      {
        data: {
          action: ((modalID) => this.deleteUserGroup(modalID, id)).bind(this),
          title: 'ACCOUNT.USER_GROUPS.MODAL_DELETE.TEXT_TITLE',
          text: 'ACCOUNT.USER_GROUPS.MODAL_DELETE.TEXT_MESSAGE',
          isLoading$: this.isSendingRequest$
        }
      }
    );
  }
}
