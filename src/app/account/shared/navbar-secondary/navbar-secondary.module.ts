import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountNavbarSecondaryComponent } from './navbar-secondary.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AccountNavbarSecondaryComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  providers: [],
  exports: [
    AccountNavbarSecondaryComponent
  ]
})
export class AccountNavbarSecondaryModule { }
