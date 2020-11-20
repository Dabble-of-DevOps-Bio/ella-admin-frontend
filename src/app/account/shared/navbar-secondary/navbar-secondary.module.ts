import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountNavbarSecondaryComponent } from './navbar-secondary.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AccountNavbarSecondaryFacade } from './navbar-secondary.facade';
import { ModalModule } from '@shared/modal';

@NgModule({
  declarations: [
    AccountNavbarSecondaryComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  providers: [
    AccountNavbarSecondaryFacade
  ],
  exports: [
    AccountNavbarSecondaryComponent
  ]
})
export class AccountNavbarSecondaryModule { }
