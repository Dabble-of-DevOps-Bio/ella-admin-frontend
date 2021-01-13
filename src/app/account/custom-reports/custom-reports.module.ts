import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountCustomReportsPageComponent } from './custom-reports.component';
import { AccountCustomReportsPageRoutingModule } from './custom-reports.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountCustomReportsPageReducer, AccountCustomReportsPageEffects } from './shared/store';
import { AccountCustomReportsPageFacade } from './custom-reports.facade';
import { AgGridModule } from 'ag-grid-angular';
import { AccountCustomReportsActionsCellRendererComponent } from './shared/components/actions-cell-renderer/actions-cell-renderer.component';
import { CustomReportModule } from '@shared/custom-report';

@NgModule({
  declarations: [
    AccountCustomReportsPageComponent,
    AccountCustomReportsActionsCellRendererComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountCustomReportsPageRoutingModule,
    StoreModule.forFeature('accountCustomReportsPage', accountCustomReportsPageReducer),
    EffectsModule.forFeature([AccountCustomReportsPageEffects]),
    AgGridModule.withComponents([AccountCustomReportsActionsCellRendererComponent]),
    CustomReportModule
  ],
  providers: [
    AccountCustomReportsPageFacade
  ]
})
export class AccountCustomReportsPageModule { }
