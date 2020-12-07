import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PublicFacade } from './public.facade';
import { NgVariableModule } from '@shared/ng-variable';

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PublicRoutingModule,
    TranslateModule,
    NgVariableModule
  ],
  providers: [
    PublicFacade
  ]
})
export class PublicModule { }
