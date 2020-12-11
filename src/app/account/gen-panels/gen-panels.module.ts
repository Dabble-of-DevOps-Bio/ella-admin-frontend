import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountPageComponent } from './gen-panels.component';
import { AccountPageRoutingModule } from './gen-panels.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountGenPanelsPageReducer } from './shared/store';
import { AccountGenPanelsPageFacade } from './gen-panels.facade';
import { GenPanelModule } from '@shared/gen-panel';
import { AccountGenPanelsPageRootEffects } from './shared/store/root';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AccountPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountPageRoutingModule,
    StoreModule.forFeature('accountGenPanelsPage', accountGenPanelsPageReducer),
    EffectsModule.forFeature([AccountGenPanelsPageRootEffects]),
    GenPanelModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    AccountGenPanelsPageFacade
  ]
})
export class AccountGenPanelsPageModule { }
