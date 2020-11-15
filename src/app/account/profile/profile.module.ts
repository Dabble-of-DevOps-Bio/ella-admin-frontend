import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountProfilePageComponent } from './profile.component';
import { AccountProfilePageRoutingModule } from './profile.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountProfilePageReducer, AccountProfilePageEffects } from './shared/store';
import { AccountProfilePageFacade } from './profile.facade';

@NgModule({
  declarations: [
    AccountProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountProfilePageRoutingModule,
    StoreModule.forFeature('accountProfilePage', accountProfilePageReducer),
    EffectsModule.forFeature([AccountProfilePageEffects])
  ],
  providers: [
    AccountProfilePageFacade
  ]
})
export class AccountProfilePageModule { }
