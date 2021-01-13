import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountCustomReportsReportPageComponent } from './report.component';
import { AccountCustomReportsReportPageRoutingModule } from './report.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountCustomReportsReportPageFacade } from './report.facade';
import { NgVariableModule } from '@shared/ng-variable';
import { NgrxFormsModule } from 'ngrx-forms';
import { AccountCustomReportsReportPatientComponent } from './shared/components/patient/patient.component';
import { AccountCustomReportsReportAdditionalsComponent } from './shared/components/additionals/additionals.component';
import { AccountCustomReportsReportResultItemsComponent } from './shared/components/result-items/result-items.component';
import { AccountCustomReportsReportResultItemComponent } from './shared/components/result-item/result-item.component';
import { AccountCustomReportsReportResultHeaderComponent } from './shared/components/result-header/result-header.component';
import { ModalModule } from '@shared/modal';
import { FormTextModule } from '@shared/form-text';
import { AccountCustomReportsReportPageEffects, accountCustomReportsReportPageReducer } from './shared/store';
import { FormTextAreaModule } from '@shared/form-textarea';
import { CustomReportModule } from '@shared/custom-report';

@NgModule({
  declarations: [
    AccountCustomReportsReportPageComponent,
    AccountCustomReportsReportPatientComponent,
    AccountCustomReportsReportAdditionalsComponent,
    AccountCustomReportsReportResultItemsComponent,
    AccountCustomReportsReportResultItemComponent,
    AccountCustomReportsReportResultHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountCustomReportsReportPageRoutingModule,
    StoreModule.forFeature('accountCustomReportsReportPage', accountCustomReportsReportPageReducer),
    EffectsModule.forFeature([
      AccountCustomReportsReportPageEffects
    ]),
    NgVariableModule,
    CustomReportModule,
    NgrxFormsModule,
    ModalModule,
    FormTextModule,
    FormTextAreaModule
  ],
  providers: [
    AccountCustomReportsReportPageFacade
  ]
})
export class AccountCustomReportsReportPageModule { }
