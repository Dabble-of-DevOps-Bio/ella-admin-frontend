import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountGenePanelsPageComponent } from './gene-panels.component';
import { AccountGenePanelsPageRoutingModule } from './gene-panels.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountGenePanelsModalDetailsEffects, accountGenePanelsPageReducer } from './shared/store';
import { AccountGenePanelsPageFacade } from './gene-panels.facade';
import { GenePanelModule } from '@shared/gene-panel';
import { AccountGenePanelsPageRootEffects } from './shared/store/root';
import { AgGridModule } from 'ag-grid-angular';
import { AccountGenePanelsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AccountGenePanelsModalDetailsFacade } from './shared/components/modal-details/modal-details.facade';
import { ModalModule } from '@shared/modal';
import { CustomMultiselectModule } from '@shared/custom-multiselect';
import { NgVariableModule } from '@shared/ng-variable';
import { NgrxFormsModule } from 'ngrx-forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountGenePanelsModalDetailsComponent } from './shared/components/modal-details/modal-details.component';
import { UserGroupModule } from '@shared/user-group';

@NgModule({
  declarations: [
    AccountGenePanelsPageComponent,
    AccountGenePanelsActionsCellRendererComponent,
    AccountGenePanelsModalDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountGenePanelsPageRoutingModule,
    StoreModule.forFeature('accountGenePanelsPage', accountGenePanelsPageReducer),
    EffectsModule.forFeature([
      AccountGenePanelsPageRootEffects,
      AccountGenePanelsModalDetailsEffects
    ]),
    GenePanelModule,
    AgGridModule.withComponents([AccountGenePanelsActionsCellRendererComponent]),
    ModalModule,
    CustomMultiselectModule,
    NgVariableModule,
    NgrxFormsModule,
    MatDialogModule,
    UserGroupModule
  ],
  providers: [
    AccountGenePanelsPageFacade,
    AccountGenePanelsModalDetailsFacade
  ]
})
export class AccountGenePanelsPageModule { }
