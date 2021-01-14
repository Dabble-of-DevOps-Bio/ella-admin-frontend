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
import { ModalModule } from '@shared/modal';
import { FormTextModule } from '@shared/form-text';
import { AccountCustomReportsReportPageEffects, accountCustomReportsReportPageReducer } from './shared/store';
import { FormTextAreaModule } from '@shared/form-textarea';
import { CustomReportModule } from '@shared/custom-report';
import { AccountCustomReportsReportAccessionComponent } from './shared/components/accession/accession.component';
import { AccountCustomReportsReportGenesComponent } from './shared/components/genes/genes.component';
import { AccountCustomReportsReportVariationsComponent } from './shared/components/variations/variations.component';
import { AccountCustomReportsReportResultComponent } from './shared/components/result/result.component';
import { AccountCustomReportsReportInterpretationComponent } from './shared/components/interpretation/interpretation.component';
import { CustomSelectModule } from '@shared/custom-select';

@NgModule({
  declarations: [
    AccountCustomReportsReportPageComponent,
    AccountCustomReportsReportAccessionComponent,
    AccountCustomReportsReportGenesComponent,
    AccountCustomReportsReportVariationsComponent,
    AccountCustomReportsReportResultComponent,
    AccountCustomReportsReportInterpretationComponent
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
    FormTextAreaModule,
    CustomSelectModule
  ],
  providers: [
    AccountCustomReportsReportPageFacade
  ]
})
export class AccountCustomReportsReportPageModule { }
