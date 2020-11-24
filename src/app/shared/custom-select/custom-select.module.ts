import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select.component';
import { CustomSelectFacade } from './custom-select.facade';
import { DropdownModule } from '../dropdown/dropdown.module';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorsModule } from '@shared/validation-errors';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DropdownModule,
    NgrxFormsModule,
    ValidationErrorsModule
  ],
  declarations: [
    CustomSelectComponent
  ],
  providers: [
    CustomSelectFacade
  ],
  exports: [
    CustomSelectComponent
  ]
})
export class CustomSelectModule { }
