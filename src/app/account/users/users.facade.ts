import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '@shared/user';
import { Router } from '@angular/router';
import { AccountUsersPageRootActions, AccountUsersPageRootSelectors } from './shared/store/root';
import { AccountModalConfirmationComponent } from '../shared/modal-confirmation';
import { ModalService } from '@shared/modal';
import { AccountUsersModalDetailsComponent } from './shared/components/modal-details/modal-details.component';

@Injectable()
export class AccountUsersPageFacade {
  public get isLoading$(): Observable<boolean> {
    return this.store.select(AccountUsersPageRootSelectors.isLoading);
  }

  public get items$(): Observable<Array<User>> {
    return this.store.select(AccountUsersPageRootSelectors.items);
  }

  public get totalItems$(): Observable<number> {
    return this.store.select(AccountUsersPageRootSelectors.totalItems);
  }

  public get isSendingRequest$(): Observable<boolean> {
    return this.store.select(AccountUsersPageRootSelectors.isSendingRequest);
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: ModalService
  ) { }

  public getItem$(id: number): Observable<User> {
    return this.store.select(AccountUsersPageRootSelectors.item, id);
  }

  public resetState(): void {
    this.store.dispatch(AccountUsersPageRootActions.resetState());
  }

  public loadItems(): void {
    this.store.dispatch(AccountUsersPageRootActions.loadItems());
  }

  public openDetailsModal(id: number): void {
    this.modalService.open(AccountUsersModalDetailsComponent, {
      panelClass: 'users-modal-panel',
      data: { id }
    });
  }

  public deleteUser(modalID: string, id: number): void {
    this.store.dispatch(AccountUsersPageRootActions.deleteUser({ modalID, id }));
  }

  public resetPassword(modalID: string, id: number): void {
    this.store.dispatch(AccountUsersPageRootActions.resetPassword({ modalID, id }));
  }

  public openDeleteModal(id: number): void {
    this.modalService.open(
      AccountModalConfirmationComponent,
      {
        data: {
          action: ((modalID) => this.resetPassword(modalID, id)).bind(this),
          title: 'ACCOUNT.USERS.MODAL_DELETE.TEXT_TITLE',
          text: 'ACCOUNT.USERS.MODAL_DELETE.TEXT_MESSAGE',
          isLoading$: this.isSendingRequest$
        }
      }
    );
  }

  public openResetPasswordModal(id: number): void {
    this.modalService.open(
      AccountModalConfirmationComponent,
      {
        data: {
          action: ((modalID) => this.deleteUser(modalID, id)).bind(this),
          title: 'ACCOUNT.USERS.MODAL_RESET_PASSWORD.TEXT_TITLE',
          text: 'ACCOUNT.USERS.MODAL_RESET_PASSWORD.TEXT_MESSAGE',
          isLoading$: this.isSendingRequest$
        }
      }
    );
  }
}
