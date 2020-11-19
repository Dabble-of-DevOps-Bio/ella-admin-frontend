import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountUsersPageComponent } from './users.component';
import { AccountUsersPageRoutingModule } from './users.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountUsersModalDetailsEffects, accountUsersPageReducer } from './shared/store';
import { AccountUsersPageFacade } from './users.facade';
import { AgGridModule } from 'ag-grid-angular';
import { AccountUsersActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountUsersModalDetailsFacade } from './shared/components/modal-details/modal-details.facade';
import { AccountUsersPageRootEffects } from './shared/store/root';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AccountUsersPageComponent,
    AccountUsersActionsCellRendererComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountUsersPageRoutingModule,
    StoreModule.forFeature('accountUsersPage', accountUsersPageReducer),
    EffectsModule.forFeature([
      AccountUsersPageRootEffects,
      AccountUsersModalDetailsEffects
    ]),
    AgGridModule.withComponents([AccountUsersActionsCellRendererComponent]),
    MatDialogModule
  ],
  providers: [
    AccountUsersPageFacade,
    AccountUsersModalDetailsFacade
  ]
})
export class AccountUsersPageModule { }
