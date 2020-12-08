import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicResetPasswordPageComponent } from './reset-password.component';
import { PublicResetPasswordPageRoutingModule } from './reset-password.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { publicResetPasswordPageReducer, PublicResetPasswordPageEffects } from './shared/store';
import { PublicResetPasswordPageFacade } from './reset-password.facade';
import { NgVariableModule } from '@shared/ng-variable';
import { NgrxFormsModule } from 'ngrx-forms';
import { FormPasswordModule } from '@shared/form-password';

@NgModule({
  declarations: [
    PublicResetPasswordPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicResetPasswordPageRoutingModule,
    StoreModule.forFeature('publicResetPasswordPage', publicResetPasswordPageReducer),
    EffectsModule.forFeature([PublicResetPasswordPageEffects]),
    NgVariableModule,
    NgrxFormsModule,
    FormPasswordModule
  ],
  providers: [
    PublicResetPasswordPageFacade
  ]
})
export class PublicResetPasswordPageModule { }
