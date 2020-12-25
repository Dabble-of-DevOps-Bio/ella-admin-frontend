import { CommonModule } from '@angular/common';
import { FormTextAreaComponent } from './form-textarea.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { ValidationErrorsModule } from '@shared/validation-errors';

@NgModule({
  declarations: [
    FormTextAreaComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule,
    ValidationErrorsModule
  ],
  exports: [
    FormTextAreaComponent
  ]
})
export class FormTextAreaModule { }
