import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountUsersPageComponent } from './users.component';
import { AccountUsersPageRoutingModule } from './users.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountUsersPageReducer, AccountUsersPageEffects } from './shared/store';

@NgModule({
  declarations: [
    AccountUsersPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountUsersPageRoutingModule,
    StoreModule.forFeature('accountUsersPage', accountUsersPageReducer),
    EffectsModule.forFeature([AccountUsersPageEffects])
  ],
  providers: []
})
export class AccountUsersPageModule { }
