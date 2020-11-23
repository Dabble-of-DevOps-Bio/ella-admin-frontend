import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User, UserSelectors } from '@shared/user';
import { Router } from '@angular/router';
import { AccountUsersPageRootActions, AccountUsersPageRootSelectors } from './shared/store/root';
import { AccountModalConfirmationComponent } from '../shared/modal-confirmation';
import { ModalService } from '@shared/modal';
import { AccountUsersModalDetailsComponent } from './shared/components/modal-details/modal-details.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthGroupEnum } from '@shared/user/enums';
import { AgGridColumn } from 'ag-grid-angular';
import { AccountUsersActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { DateTime } from 'luxon';
import { configuration } from '@configurations';
import { AccountUsersModalPasswordComponent } from './shared/components/modal-password/modal-password.component';

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

  public get isAdmin$(): Observable<boolean> {
    return this.store.select(UserSelectors.isAdmin);
  }

  public get columnDefs(): Array<Partial<AgGridColumn>> {
    return [
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_ID'),
        field: 'id',
        sortable: true,
        filter: true,
        maxWidth: 80
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_USERNAME'),
        field: 'username',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_FIRST_NAME'),
        field: 'firstName',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_LAST_NAME'),
        field: 'lastName',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_EMAIL'),
        field: 'email',
        sortable: true,
        filter: true
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_GROUP'),
        field: 'group.name',
        sortable: true,
        filter: true,
        maxWidth: 140
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_AUTH_GROUP'),
        field: 'authGroup',
        sortable: true,
        filter: true,
        maxWidth: 140,
        valueFormatter: (params: any) => this.translateService.instant('SHARED.AUTH_GROUPS.TEXT_' + AuthGroupEnum[params.value])
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_CREATED'),
        field: 'createdAt',
        sortable: true,
        filter: true,
        maxWidth: 120,
        valueFormatter: (params: any) => DateTime.fromJSDate(params.value).toFormat(configuration.dateFormat)
      },
      {
        headerName: this.translateService.instant('ACCOUNT.USERS.COLUMNS.TEXT_ACTIONS'),
        cellRenderer: 'actionsCellRenderer',
        maxWidth: 180
      }
    ];
  }

  public get frameworkComponents(): any {
    return {
      actionsCellRenderer: AccountUsersActionsCellRendererComponent
    };
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: ModalService,
    private translateService: TranslateService
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

  public resetPassword(modalID: string, email: string): void {
    this.store.dispatch(AccountUsersPageRootActions.resetPassword({ modalID, email }));
  }

  public openChangePasswordModal(id: number): void {
    this.modalService.open(AccountUsersModalPasswordComponent, {
      panelClass: 'users-password-modal-panel',
      data: { id }
    });
  }

  public openDeleteModal(id: number): void {
    this.modalService.open(
      AccountModalConfirmationComponent,
      {
        data: {
          action: ((modalID) => this.deleteUser(modalID, id)).bind(this),
          title: 'ACCOUNT.USERS.MODAL_DELETE.TEXT_TITLE',
          text: 'ACCOUNT.USERS.MODAL_DELETE.TEXT_MESSAGE',
          isLoading$: this.isSendingRequest$
        }
      }
    );
  }

  public openResetPasswordModal(email: string): void {
    this.modalService.open(
      AccountModalConfirmationComponent,
      {
        data: {
          action: ((modalID) => this.resetPassword(modalID, email)).bind(this),
          title: 'ACCOUNT.USERS.MODAL_RESET_PASSWORD.TEXT_TITLE',
          text: 'ACCOUNT.USERS.MODAL_RESET_PASSWORD.TEXT_MESSAGE',
          isLoading$: this.isSendingRequest$
        }
      }
    );
  }
}
