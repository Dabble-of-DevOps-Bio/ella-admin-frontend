import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountPageComponent } from './gen-panels.component';
import { AccountPageRoutingModule } from './gen-panels.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountGenPanelsModalDetailsEffects, accountGenPanelsPageReducer } from './shared/store';
import { AccountGenPanelsPageFacade } from './gen-panels.facade';
import { GenPanelModule } from '@shared/gen-panel';
import { AccountGenPanelsPageRootEffects } from './shared/store/root';
import { AgGridModule } from 'ag-grid-angular';
import { AccountGenPanelsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountGenPanelsModalDetailsFacade } from './shared/components/modal-details/modal-details.facade';
import { ModalModule } from '@shared/modal';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { NgVariableModule } from '@shared/ng-variable';
import { NgrxFormsModule } from 'ngrx-forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountGenPanelsModalDetailsComponent } from './shared/components/modal-details/modal-details.component';
import { UserGroupModule } from '@shared/user-group';

@NgModule({
  declarations: [
    AccountPageComponent,
    AccountGenPanelsActionsCellRendererComponent,
    AccountGenPanelsModalDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountPageRoutingModule,
    StoreModule.forFeature('accountGenPanelsPage', accountGenPanelsPageReducer),
    EffectsModule.forFeature([
      AccountGenPanelsPageRootEffects,
      AccountGenPanelsModalDetailsEffects
    ]),
    GenPanelModule,
    AgGridModule.withComponents([AccountGenPanelsActionsCellRendererComponent]),
    ModalModule,
    CustomMultiselectModule,
    NgVariableModule,
    NgrxFormsModule,
    MatDialogModule,
    UserGroupModule
  ],
  providers: [
    AccountGenPanelsPageFacade,
    AccountGenPanelsModalDetailsFacade
  ]
})
export class AccountGenPanelsPageModule { }
