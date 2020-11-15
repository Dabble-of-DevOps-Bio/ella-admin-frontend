import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarFacade } from './navbar.facade';
import { NgVariableModule } from '@shared/ng-variable';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgVariableModule
  ],
  providers: [
    NavbarFacade
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
