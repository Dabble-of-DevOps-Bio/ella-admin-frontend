import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAnalysesPageComponent } from './analyses.component';
import { AccountAnalysesPageRoutingModule } from './analyses.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountAnalysesPageReducer, AccountAnalysesPageEffects } from './shared/store';
import { AccountAnalysesPageFacade } from './analyses.facade';
import { AgGridModule } from 'ag-grid-angular';
import { AccountAnalysesActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { AnalysisModule } from '@shared/analysis';

@NgModule({
  declarations: [
    AccountAnalysesPageComponent,
    AccountAnalysesActionsCellRendererComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAnalysesPageRoutingModule,
    StoreModule.forFeature('accountAnalysesPage', accountAnalysesPageReducer),
    EffectsModule.forFeature([AccountAnalysesPageEffects]),
    AgGridModule.withComponents([AccountAnalysesActionsCellRendererComponent]),
    AnalysisModule
  ],
  providers: [
    AccountAnalysesPageFacade
  ]
})
export class AccountAnalysesPageModule { }
