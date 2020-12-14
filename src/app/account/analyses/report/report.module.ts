import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAnalysesReportPageComponent } from './report.component';
import { AccountAnalysesReportPageRoutingModule } from './report.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountAnalysesReportPageReducer, AccountAnalysesReportPageEffects } from './shared/store';
import { AccountAnalysesReportPageFacade } from './report.facade';

@NgModule({
  declarations: [
    AccountAnalysesReportPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAnalysesReportPageRoutingModule,
    StoreModule.forFeature('accountAnalysesReportPage', accountAnalysesReportPageReducer),
    EffectsModule.forFeature([AccountAnalysesReportPageEffects])
  ],
  providers: [
    AccountAnalysesReportPageFacade
  ]
})
export class AccountAnalysesReportPageModule { }
