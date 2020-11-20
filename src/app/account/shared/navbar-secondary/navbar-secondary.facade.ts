import { AppState } from '@shared/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModalService } from '@shared/modal';
import { AccountUsersModalDetailsComponent } from '@app/account/users/shared/components/modal-details/modal-details.component';

@Injectable()
export class AccountNavbarSecondaryFacade {
  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) { }

  public openNewUserModal(): void {
    this.modalService.open(AccountUsersModalDetailsComponent, {
      panelClass: 'users-modal-panel',
      data: { isNewUser: true }
    });
  }
}
