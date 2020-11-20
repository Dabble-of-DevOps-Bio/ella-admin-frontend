import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountUserGroupsPageComponent } from './user-groups.component';
import { AccountUserGroupsPageRoutingModule } from './user-groups.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { accountUserGroupsPageReducer, AccountUserGroupsPageEffects } from './shared/store';

@NgModule({
  declarations: [
    AccountUserGroupsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AccountUserGroupsPageRoutingModule,
    StoreModule.forFeature('accountUserGroupsPage', accountUserGroupsPageReducer),
    EffectsModule.forFeature([AccountUserGroupsPageEffects])
  ],
  providers: []
})
export class AccountUserGroupsPageModule { }
