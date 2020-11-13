import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicLoginPageComponent } from './login.component';
import { PublicLoginPageRoutingModule } from './login.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { publicLoginPageReducer, PublicLoginPageEffects } from './shared/store';
import { FormTextModule } from '@shared/form-text';
import { FormPasswordModule } from '@shared/form-password';
import { NgVariableModule } from '@shared/ng-variable';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
  declarations: [
    PublicLoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicLoginPageRoutingModule,
    StoreModule.forFeature('publicLoginPage', publicLoginPageReducer),
    EffectsModule.forFeature([PublicLoginPageEffects]),
    FormTextModule,
    FormPasswordModule,
    NgVariableModule,
    NgrxFormsModule
  ],
  providers: []
})
export class PublicLoginPageModule { }
