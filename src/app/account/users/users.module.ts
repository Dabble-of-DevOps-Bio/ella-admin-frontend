import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountUsersPageComponent } from './users.component';
import { AccountUsersPageRoutingModule } from './users.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountUsersModalDetailsEffects, AccountUsersModalPasswordEffects, accountUsersPageReducer, AccountUsersPageRootEffects } from './shared/store';
import { AccountUsersPageFacade } from './users.facade';
import { AgGridModule } from 'ag-grid-angular';
import { AccountUsersActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountUsersModalDetailsFacade } from './shared/components/modal-details/modal-details.facade';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountUsersModalDetailsComponent } from './shared/components/modal-details/modal-details.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { ModalModule } from '@shared/modal';
import { NgVariableModule } from '@shared/ng-variable';
import { FormTextModule } from '@shared/form-text';
import { CustomSelectModule } from '@shared/custom-select';
import { AccountUsersModalPasswordFacade } from './shared/components/modal-password/modal-password.facade';
import { AccountUsersModalPasswordComponent } from './shared/components/modal-password/modal-password.component';
import { FormPasswordModule } from '@shared/form-password';

@NgModule({
  declarations: [
    AccountUsersPageComponent,
    AccountUsersActionsCellRendererComponent,
    AccountUsersModalDetailsComponent,
    AccountUsersModalPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountUsersPageRoutingModule,
    NgrxFormsModule,
    ModalModule,
    StoreModule.forFeature('accountUsersPage', accountUsersPageReducer),
    EffectsModule.forFeature([
      AccountUsersPageRootEffects,
      AccountUsersModalDetailsEffects,
      AccountUsersModalPasswordEffects
    ]),
    AgGridModule.withComponents([AccountUsersActionsCellRendererComponent]),
    MatDialogModule,
    NgVariableModule,
    FormTextModule,
    FormPasswordModule,
    CustomSelectModule
  ],
  providers: [
    AccountUsersPageFacade,
    AccountUsersModalDetailsFacade,
    AccountUsersModalPasswordFacade
  ]
})
export class AccountUsersPageModule { }
