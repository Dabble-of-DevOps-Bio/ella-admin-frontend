import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing';
import { RouterModule } from '@angular/router';
import { AccountNavbarSecondaryModule } from './shared/navbar-secondary';
import { TranslateModule } from '@ngx-translate/core';
import { AccountModalConfirmationComponent } from './shared/modal-confirmation';
import { ModalModule } from '@shared/modal';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AccountComponent,
    AccountModalConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AccountRoutingModule,
    AccountNavbarSecondaryModule,
    MatDialogModule
  ]
})
export class AccountModule { }
