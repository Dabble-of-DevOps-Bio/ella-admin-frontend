import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountAnalysesReportPageComponent } from './report.component';
import { AccountAnalysesReportPageRoutingModule } from './report.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountAnalysesReportPageFacade } from './report.facade';
import { NgVariableModule } from '@shared/ng-variable';
import { AnalysisModule } from '@shared/analysis';
import { NgrxFormsModule } from 'ngrx-forms';
import { AccountAnalysesReportPatientComponent } from './shared/components/patient/patient.component';
import { AccountAnalysesReportAdditionalsComponent } from './shared/components/additionals/additionals.component';
import { AccountAnalysesReportResultItemsComponent } from './shared/components/result-items/result-items.component';
import { AccountAnalysesReportResultItemComponent } from './shared/components/result-item/result-item.component';
import { AccountAnalysesReportResultHeaderComponent } from './shared/components/result-header/result-header.component';
import { AccountAnalysesReportModalEditComponent } from './shared/components/modal-edit/modal-edit.component';
import { ModalModule } from '@shared/modal';
import { FormTextModule } from '@shared/form-text';
import { AccountAnalysesReportModalEditEffects, accountAnalysesReportPageReducer, AccountAnalysesReportPageRootEffects } from './shared/store';

@NgModule({
  declarations: [
    AccountAnalysesReportPageComponent,
    AccountAnalysesReportPatientComponent,
    AccountAnalysesReportAdditionalsComponent,
    AccountAnalysesReportResultItemsComponent,
    AccountAnalysesReportResultItemComponent,
    AccountAnalysesReportResultHeaderComponent,
    AccountAnalysesReportModalEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountAnalysesReportPageRoutingModule,
    StoreModule.forFeature('accountAnalysesReportPage', accountAnalysesReportPageReducer),
    EffectsModule.forFeature([
      AccountAnalysesReportPageRootEffects,
      AccountAnalysesReportModalEditEffects
    ]),
    NgVariableModule,
    AnalysisModule,
    NgrxFormsModule,
    ModalModule,
    FormTextModule
  ],
  providers: [
    AccountAnalysesReportPageFacade
  ]
})
export class AccountAnalysesReportPageModule { }
