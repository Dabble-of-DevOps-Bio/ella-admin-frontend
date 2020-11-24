import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicForgotPasswordPageComponent } from './forgot-password.component';
import { PublicForgotPasswordPageRoutingModule } from './forgot-password.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { publicForgotPasswordPageReducer, PublicForgotPasswordPageEffects } from './shared/store';
import { FormTextModule } from '@shared/form-text';
import { NgVariableModule } from '@shared/ng-variable';
import { PublicForgotPasswordPageFacade } from './forgot-password.facade';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
  declarations: [
    PublicForgotPasswordPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgrxFormsModule,
    PublicForgotPasswordPageRoutingModule,
    StoreModule.forFeature('publicForgotPasswordPage', publicForgotPasswordPageReducer),
    EffectsModule.forFeature([PublicForgotPasswordPageEffects]),
    FormTextModule,
    NgVariableModule
  ],
  providers: [
    PublicForgotPasswordPageFacade
  ]
})
export class PublicForgotPasswordPageModule { }
