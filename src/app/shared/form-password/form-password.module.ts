import { CommonModule } from '@angular/common';
import { FormPasswordComponent } from './form-password.component';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
// import { ValidationErrorsModule } from '@shared/validation-errors';

@NgModule({
  declarations: [
    FormPasswordComponent
  ],
  imports: [
    CommonModule,
    NgrxFormsModule
  ],
  exports: [
    FormPasswordComponent
  ]
})
export class FormPasswordModule { }
