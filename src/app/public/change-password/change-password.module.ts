import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicChangePasswordPageComponent } from './change-password.component';
import { PublicChangePasswordPageRoutingModule } from './change-password.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { publicChangePasswordPageReducer, PublicChangePasswordPageEffects } from './shared/store';

@NgModule({
  declarations: [
    PublicChangePasswordPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PublicChangePasswordPageRoutingModule,
    StoreModule.forFeature('publicChangePasswordPage', publicChangePasswordPageReducer),
    EffectsModule.forFeature([PublicChangePasswordPageEffects])
  ],
  providers: []
})
export class PublicChangePasswordPageModule { }
