import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountUserGroupsPageComponent } from './user-groups.component';
import { AccountUserGroupsPageRoutingModule } from './user-groups.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountUserGroupsPageFacade } from './user-groups.facade';
import { NgrxFormsModule } from 'ngrx-forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { NgVariableModule } from '@shared/ng-variable';
import { FormTextModule } from '@shared/form-text';
import { AccountUserGroupsPageRootEffects, accountUserGroupsPageReducer, AccountUserGroupsModalDetailsEffects } from './shared/store';
import { AccountUserGroupsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountUserGroupsModalDetailsFacade } from './shared/components/modal-details/modal-details.facade';
import { UserGroupModule } from '@shared/user-group';
import { ModalModule } from '@shared/modal';
import { AccountUserGroupsModalDetailsComponent } from './shared/components/modal-details/modal-details.component';

@NgModule({
  declarations: [
    AccountUserGroupsPageComponent,
    AccountUserGroupsActionsCellRendererComponent,
    AccountUserGroupsModalDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountUserGroupsPageRoutingModule,
    StoreModule.forFeature('accountUserGroupsPage', accountUserGroupsPageReducer),
    EffectsModule.forFeature([
      AccountUserGroupsPageRootEffects,
      AccountUserGroupsModalDetailsEffects
    ]),
    NgrxFormsModule,
    AgGridModule.withComponents([AccountUserGroupsActionsCellRendererComponent]),
    MatDialogModule,
    NgVariableModule,
    FormTextModule,
    UserGroupModule,
    ModalModule
  ],
  providers: [
    AccountUserGroupsPageFacade,
    AccountUserGroupsModalDetailsFacade
  ]
})
export class AccountUserGroupsPageModule { }
